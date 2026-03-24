import { Send, SkipForward } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Lead, Message, STAGE_ACTION_REPLIES, FOLLOWUP_REPLIES, STAGES, STAGE_COLORS, STAGE_TEXT_COLORS, formatMessageTime, formatTimeInStage } from "@/data/crmData";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  lead: Lead;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onNextLead?: () => void;
  flowInfo?: { waitingCount: number; nextLeadName: string; nextLeadTime: string } | null;
}

export function ChatPanel({ lead, messages, onSendMessage, onNextLead, flowInfo }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [stageToast, setStageToast] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setInput("");
  }, [lead.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Watch for stage changes
  const prevStageRef = useRef(lead.stage);
  useEffect(() => {
    if (prevStageRef.current !== lead.stage) {
      const idx = STAGES.indexOf(lead.stage);
      setStageToast(`Moved to Stage ${idx + 1} — ${lead.stage}`);
      prevStageRef.current = lead.stage;
      const t = setTimeout(() => setStageToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [lead.stage]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleQuickReply = (text: string) => {
    onSendMessage(text);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (e.ctrlKey && onNextLead) {
        onNextLead();
      } else {
        handleSend();
      }
    }
  };

  const currentIdx = STAGES.indexOf(lead.stage);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Flow indicator bar */}
      {flowInfo && flowInfo.waitingCount > 0 && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-primary/10 border-b border-primary/20 text-xs">
          <span className="text-primary font-semibold">
            {flowInfo.waitingCount} leads waiting
          </span>
          <span className="text-muted-foreground">
            Next: <span className="text-foreground font-medium">{flowInfo.nextLeadName}</span>
            <span className="text-muted-foreground/70 ml-1">({flowInfo.nextLeadTime})</span>
          </span>
        </div>
      )}

      {/* Header with stage */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-card/50">
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground shrink-0">
          {lead.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate leading-tight">{lead.name}</p>
          <p className="text-[10px] text-muted-foreground leading-tight">{lead.username} · Telegram</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary">
            <span className={cn("h-2 w-2 rounded-full", STAGE_COLORS[lead.stage])} />
            <span className={cn("text-[11px] font-semibold", STAGE_TEXT_COLORS[lead.stage])}>
              Stage {currentIdx + 1} — {lead.stage}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">
            {formatTimeInStage(lead.stageEnteredAt)}
          </span>
        </div>
      </div>

      {/* Stage change toast */}
      {stageToast && (
        <div className="mx-4 mt-2 px-3 py-1.5 rounded-lg bg-primary/15 border border-primary/30 text-xs font-semibold text-primary text-center animate-in fade-in slide-in-from-top-2 duration-200">
          ✓ {stageToast}
        </div>
      )}

      {/* Messages — tighter density */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.sender === "operator" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[75%] px-3 py-1.5 rounded-2xl text-[13px] leading-snug",
                msg.sender === "operator"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              )}
            >
              <p>{msg.text}</p>
              <p className={cn(
                "text-[9px] mt-0.5",
                msg.sender === "operator" ? "text-primary-foreground/50" : "text-muted-foreground/70"
              )}>
                {formatMessageTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies — grouped */}
      <div className="px-3 py-1.5 border-t border-border/50 space-y-1">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {STAGE_ACTION_REPLIES.map((qr) => (
            <button
              key={qr}
              onClick={() => handleQuickReply(qr)}
              className="shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-primary/15 text-primary hover:bg-primary/25 transition-colors whitespace-nowrap"
            >
              {qr}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {FOLLOWUP_REPLIES.map((qr) => (
            <button
              key={qr}
              onClick={() => handleQuickReply(qr)}
              className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent transition-colors whitespace-nowrap"
            >
              {qr}
            </button>
          ))}
        </div>
      </div>

      {/* Input + Send + Next Lead */}
      <div className="px-3 py-2 border-t border-border flex gap-2 items-center">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message… (Ctrl+Enter → next lead)"
          className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
        {onNextLead && (
          <button
            onClick={onNextLead}
            className="h-10 px-4 rounded-xl bg-primary text-primary-foreground flex items-center gap-1.5 hover:bg-primary/90 transition-colors text-xs font-bold shrink-0"
          >
            Next
            <SkipForward className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
