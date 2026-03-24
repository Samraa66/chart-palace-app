import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Lead, Stage, STAGES, STAGE_COLORS, STAGE_TEXT_COLORS, formatTimeInStage } from "@/data/crmData";
import { cn } from "@/lib/utils";

interface LeadListProps {
  leads: Lead[];
  selectedLeadId: string | null;
  onSelectLead: (id: string) => void;
}

export function LeadList({ leads, selectedLeadId, onSelectLead }: LeadListProps) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "All">("All");

  const filtered = leads
    .filter((l) => {
      if (stageFilter !== "All" && l.stage !== stageFilter) return false;
      if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.username.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => new Date(a.stageEnteredAt).getTime() - new Date(b.stageEnteredAt).getTime());

  const stageOptions: (Stage | "All")[] = ["All", ...STAGES];

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-3 border-b border-border space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-secondary border-none text-sm"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {stageOptions.slice(0, 6).map((s) => (
            <button
              key={s}
              onClick={() => setStageFilter(s)}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors",
                stageFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.map((lead) => (
          <button
            key={lead.id}
            onClick={() => onSelectLead(lead.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 border-b border-border/50 transition-colors text-left",
              selectedLeadId === lead.id ? "bg-accent" : "hover:bg-secondary/50"
            )}
          >
            <div className="relative shrink-0">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-foreground">
                {lead.avatar}
              </div>
              {lead.unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {lead.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground truncate">{lead.name}</span>
                <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                  {formatTimeInStage(lead.stageEnteredAt)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", STAGE_COLORS[lead.stage])} />
                <span className={cn("text-[11px] truncate", STAGE_TEXT_COLORS[lead.stage])}>
                  {lead.stage}
                </span>
                <span className="text-[11px] text-muted-foreground/60 truncate">
                  · {lead.username}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
