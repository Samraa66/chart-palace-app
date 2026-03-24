import { Send, SkipForward } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Lead, Message, QUICK_REPLIES, STAGES, STAGE_COLORS, STAGE_TEXT_COLORS, formatMessageTime, formatTimeInStage } from "@/data/crmData";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  lead: Lead;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onNextLead?: () => void;
}

const PRIMARY_REPLIES = QUICK_REPLIES.slice(0, 3);
const SECONDARY_REPLIES = QUICK_REPLIES.slice(3);

export function ChatPanel({ lead, messages, onSendMessage, onNextLead }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [qrIndex, setQrIndex] = useState(-1);

  // Auto-focus input when lead changes
  useEffect(() => {
    inputRef.current?.focus();
    setInput("");
    setQrIndex(-1);
  }, [lead.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Re-focus after send
  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
    setQrIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleQuickReply = (text: string) => {
    onSendMessage(text);
    setQrIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const total = QUICK_REPLIES.length;
      const next = (qrIndex + 1) % total;
      setQrIndex(next);
      setInput(QUICK_REPLIES[next]);
    }
  };

  const currentIdx = STAGES.indexOf(lead.stage);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with stage info */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-card/50">
        <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-foreground shrink-0">
          {lead.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
          <p className="text-[11px] text-muted-foreground">{lead.username} · Telegram</p>
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.sender === "operator" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[75%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed",
                msg.sender === "operator"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              )}
            >
              <p>{msg.text}</p>
              <p className={cn(
                "text-[10px] mt-1",
                msg.sender === "operator" ? "text-primary-foreground/60" : "text-muted-foreground"
              )}>
                {formatMessageTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies — dominant, above input */}
      <div className="px-3 py-2 border-t border-border/50 flex gap-1.5 overflow-x-auto scrollbar-hide">
        {PRIMARY_REPLIES.map((qr, i) => (
          <button
            key={qr}
            onClick={() => handleQuickReply(qr)}
            className={cn(
              "shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap",
              qrIndex === i
                ? "bg-primary text-primary-foreground"
                : "bg-primary/15 text-primary hover:bg-primary/25"
            )}
          >
            {qr}
          </button>
        ))}
        {SECONDARY_REPLIES.map((qr, i) => (
          <button
            key={qr}
            onClick={() => handleQuickReply(qr)}
            className={cn(
              "shrink-0 px-3 py-2 rounded-lg text-xs transition-colors whitespace-nowrap",
              qrIndex === i + PRIMARY_REPLIES.length
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Input + Next Lead */}
      <div className="px-3 py-3 border-t border-border flex gap-2 items-center">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => { setInput(e.target.value); setQrIndex(-1); }}
          onKeyDown={handleKeyDown}
          placeholder="Type a message… (Tab for quick replies)"
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
            className="h-10 px-3 rounded-xl bg-accent text-accent-foreground flex items-center gap-1.5 hover:bg-accent/80 transition-colors text-xs font-semibold shrink-0"
          >
            Next
            <SkipForward className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
