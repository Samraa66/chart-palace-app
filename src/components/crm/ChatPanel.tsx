import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Lead, Message, QUICK_REPLIES, formatMessageTime } from "@/data/crmData";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  lead: Lead;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export function ChatPanel({ lead, messages, onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50">
        <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-foreground">
          {lead.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
          <p className="text-[11px] text-muted-foreground">{lead.username} · Telegram</p>
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

      {/* Quick replies */}
      <div className="px-3 py-2 border-t border-border/50 flex gap-1.5 overflow-x-auto scrollbar-hide">
        {QUICK_REPLIES.map((qr) => (
          <button
            key={qr}
            onClick={() => setInput(qr)}
            className="shrink-0 px-3 py-1.5 rounded-full bg-secondary text-[11px] text-muted-foreground hover:text-foreground hover:bg-accent transition-colors whitespace-nowrap"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-border flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
