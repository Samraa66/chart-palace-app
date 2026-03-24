import { useState, useCallback } from "react";
import { ArrowLeft, PanelRightOpen } from "lucide-react";
import { LeadList } from "@/components/crm/LeadList";
import { ChatPanel } from "@/components/crm/ChatPanel";
import { LeadDetails } from "@/components/crm/LeadDetails";
import { leads as initialLeads, messages as initialMessages, Lead, Message } from "@/data/crmData";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type MobileView = "list" | "chat" | "details";

export default function CRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [allMessages, setAllMessages] = useState<Message[]>(initialMessages);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<MobileView>("list");

  const selectedLead = leads.find((l) => l.id === selectedLeadId) ?? null;
  const leadMessages = selectedLeadId ? allMessages.filter((m) => m.leadId === selectedLeadId) : [];

  const handleSelectLead = useCallback((id: string) => {
    setSelectedLeadId(id);
    // Clear unread
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, unread: 0 } : l)));
    if (isMobile) setMobileView("chat");
  }, [isMobile]);

  const handleSendMessage = useCallback((text: string) => {
    if (!selectedLeadId) return;
    const msg: Message = {
      id: `m-${Date.now()}`,
      leadId: selectedLeadId,
      text,
      sender: "operator",
      timestamp: new Date().toISOString(),
    };
    setAllMessages((prev) => [...prev, msg]);
  }, [selectedLeadId]);

  const handleUpdateLead = useCallback((updated: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  }, []);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="h-[calc(100vh-3.5rem)] flex flex-col">
        {mobileView === "list" && (
          <LeadList leads={leads} selectedLeadId={selectedLeadId} onSelectLead={handleSelectLead} />
        )}
        {mobileView === "chat" && selectedLead && (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 px-2 py-1 border-b border-border bg-card">
              <button onClick={() => setMobileView("list")} className="p-2 hover:bg-accent rounded-lg">
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <button onClick={() => setMobileView("details")} className="ml-auto p-2 hover:bg-accent rounded-lg">
                <PanelRightOpen className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <ChatPanel lead={selectedLead} messages={leadMessages} onSendMessage={handleSendMessage} />
            </div>
          </div>
        )}
        {mobileView === "details" && selectedLead && (
          <div className="flex flex-col h-full">
            <div className="flex items-center px-2 py-1 border-b border-border bg-card">
              <button onClick={() => setMobileView("chat")} className="p-2 hover:bg-accent rounded-lg">
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="text-sm font-medium text-foreground ml-2">Lead Details</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <LeadDetails lead={selectedLead} onUpdateLead={handleUpdateLead} />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="h-[calc(100vh-3.5rem)] flex -m-4 md:-m-6">
      {/* Left: Lead list */}
      <div className="w-80 shrink-0">
        <LeadList leads={leads} selectedLeadId={selectedLeadId} onSelectLead={handleSelectLead} />
      </div>

      {/* Center: Chat */}
      <div className="flex-1 min-w-0">
        {selectedLead ? (
          <ChatPanel lead={selectedLead} messages={leadMessages} onSendMessage={handleSendMessage} />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            Select a lead to start chatting
          </div>
        )}
      </div>

      {/* Right: Details */}
      {selectedLead && showDetails && (
        <div className="w-72 shrink-0">
          <LeadDetails lead={selectedLead} onUpdateLead={handleUpdateLead} />
        </div>
      )}
    </div>
  );
}
