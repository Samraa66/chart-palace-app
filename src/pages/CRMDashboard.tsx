import { useState, useCallback } from "react";
import { ArrowLeft, PanelRightOpen, X } from "lucide-react";
import { LeadList } from "@/components/crm/LeadList";
import { ChatPanel } from "@/components/crm/ChatPanel";
import { LeadDetails } from "@/components/crm/LeadDetails";
import { leads as initialLeads, messages as initialMessages, Lead, Message, formatTimeInStage } from "@/data/crmData";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const sortedLeads = [...leads].sort(
    (a, b) => new Date(a.stageEnteredAt).getTime() - new Date(b.stageEnteredAt).getTime()
  );

  const getFlowInfo = useCallback(() => {
    const currentIndex = sortedLeads.findIndex((l) => l.id === selectedLeadId);
    const nextIndex = (currentIndex + 1) % sortedLeads.length;
    const nextLead = sortedLeads[nextIndex];
    const waitingCount = leads.filter((l) => l.unread > 0 || l.id !== selectedLeadId).length;
    if (!nextLead) return null;
    return {
      waitingCount,
      nextLeadName: nextLead.name,
      nextLeadTime: formatTimeInStage(nextLead.stageEnteredAt),
    };
  }, [sortedLeads, selectedLeadId, leads]);

  const handleSelectLead = useCallback((id: string) => {
    setSelectedLeadId(id);
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

  const handleNextLead = useCallback(() => {
    const currentIndex = sortedLeads.findIndex((l) => l.id === selectedLeadId);
    const nextIndex = (currentIndex + 1) % sortedLeads.length;
    const nextLead = sortedLeads[nextIndex];
    if (nextLead) handleSelectLead(nextLead.id);
  }, [sortedLeads, selectedLeadId, handleSelectLead]);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="h-[100dvh] flex flex-col bg-background">
        {mobileView === "list" && (
          <LeadList leads={leads} selectedLeadId={selectedLeadId} onSelectLead={handleSelectLead} />
        )}
        {mobileView === "chat" && selectedLead && (
          <div className="flex flex-col h-full">
            {/* iOS-style navigation bar */}
            <div className="safe-top flex items-center justify-between px-1 py-1 border-b border-border bg-card/80 backdrop-blur-xl">
              <button
                onClick={() => setMobileView("list")}
                className="flex items-center gap-0.5 px-2 py-2 text-primary active:opacity-70 transition-opacity"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Leads</span>
              </button>
              <button
                onClick={() => setMobileView("details")}
                className="px-3 py-2 text-primary active:opacity-70 transition-opacity"
              >
                <PanelRightOpen className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <ChatPanel
                lead={selectedLead}
                messages={leadMessages}
                onSendMessage={handleSendMessage}
                onNextLead={handleNextLead}
                onUpdateLead={handleUpdateLead}
                flowInfo={getFlowInfo()}
              />
            </div>
          </div>
        )}
        {mobileView === "details" && selectedLead && (
          <div className="flex flex-col h-full">
            <div className="safe-top flex items-center px-1 py-1 border-b border-border bg-card/80 backdrop-blur-xl">
              <button
                onClick={() => setMobileView("chat")}
                className="flex items-center gap-0.5 px-2 py-2 text-primary active:opacity-70 transition-opacity"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Chat</span>
              </button>
              <span className="text-sm font-semibold text-foreground ml-auto mr-3">Details</span>
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
    <div className="h-screen flex">
      <div className="w-80 shrink-0 border-r border-border">
        <LeadList leads={leads} selectedLeadId={selectedLeadId} onSelectLead={handleSelectLead} />
      </div>
      <div className="flex-1 min-w-0">
        {selectedLead ? (
          <ChatPanel
            lead={selectedLead}
            messages={leadMessages}
            onSendMessage={handleSendMessage}
            onNextLead={handleNextLead}
            onUpdateLead={handleUpdateLead}
            flowInfo={getFlowInfo()}
            lead={selectedLead}
            messages={leadMessages}
            onSendMessage={handleSendMessage}
            onNextLead={handleNextLead}
            flowInfo={getFlowInfo()}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            Select a lead to start chatting
          </div>
        )}
      </div>
      {selectedLead && showDetails && (
        <div className="w-72 shrink-0">
          <LeadDetails lead={selectedLead} onUpdateLead={handleUpdateLead} />
        </div>
      )}
    </div>
  );
}
