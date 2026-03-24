import { ChevronRight, AlertTriangle, StickyNote } from "lucide-react";
import { useState } from "react";
import { Lead, Stage, STAGES, STAGE_COLORS, STAGE_TEXT_COLORS, formatTimeInStage } from "@/data/crmData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface LeadDetailsProps {
  lead: Lead;
  onUpdateLead: (updated: Lead) => void;
}

export function LeadDetails({ lead, onUpdateLead }: LeadDetailsProps) {
  const [notes, setNotes] = useState(lead.notes);
  const currentIdx = STAGES.indexOf(lead.stage);

  const moveToNext = () => {
    if (currentIdx < STAGES.length - 1) {
      onUpdateLead({ ...lead, stage: STAGES[currentIdx + 1], stageEnteredAt: new Date().toISOString() });
    }
  };

  const saveNotes = () => {
    onUpdateLead({ ...lead, notes });
  };

  return (
    <div className="flex flex-col h-full bg-card border-l border-border p-4 space-y-5 overflow-y-auto">
      {/* Lead info */}
      <div className="text-center">
        <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold text-foreground mx-auto">
          {lead.avatar}
        </div>
        <h3 className="text-sm font-semibold text-foreground mt-2">{lead.name}</h3>
        <p className="text-[11px] text-muted-foreground">{lead.username}</p>
      </div>

      {/* Current stage */}
      <div className="glass-card p-3 space-y-2">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Current Stage</p>
        <div className="flex items-center gap-2">
          <span className={cn("h-2.5 w-2.5 rounded-full", STAGE_COLORS[lead.stage])} />
          <span className={cn("text-sm font-semibold", STAGE_TEXT_COLORS[lead.stage])}>
            Stage {currentIdx + 1} — {lead.stage}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          In stage for <span className="text-foreground font-medium">{formatTimeInStage(lead.stageEnteredAt)}</span>
        </p>
      </div>

      {/* Stage timeline */}
      <div className="space-y-2">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Pipeline Progress</p>
        <div className="flex items-center gap-1">
          {STAGES.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={cn(
                  "h-2 flex-1 rounded-full transition-colors",
                  i <= currentIdx ? STAGE_COLORS[s] : "bg-secondary"
                )}
                title={s}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>New</span>
          <span>VIP</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button onClick={moveToNext} disabled={currentIdx >= STAGES.length - 1} className="w-full" size="sm">
          <ChevronRight className="h-4 w-4 mr-1" />
          Move to {currentIdx < STAGES.length - 1 ? STAGES[currentIdx + 1] : "—"}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Override Stage
          </Button>
          <Button variant="outline" size="sm" className="text-xs text-destructive hover:text-destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Escalate
          </Button>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <StickyNote className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Notes</p>
        </div>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about this lead..."
          className="min-h-[80px] bg-secondary border-none text-sm resize-none"
        />
        {notes !== lead.notes && (
          <Button size="sm" variant="secondary" onClick={saveNotes} className="w-full text-xs">
            Save Notes
          </Button>
        )}
      </div>
    </div>
  );
}
