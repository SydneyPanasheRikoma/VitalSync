import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Users } from "lucide-react";
import { mockFamilyMembers } from "@/lib/mockData";

export function FamilyConnect() {
  const [members, setMembers] = useState(mockFamilyMembers);

  const toggleSharing = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, sharingEnabled: !m.sharingEnabled } : m))
    );
  };

  return (
    <div className="glass-card rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-alert-low/10">
          <Users className="h-5 w-5 text-alert-low" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Family Connect</h3>
          <p className="text-xs text-muted-foreground">Share real-time vitals</p>
        </div>
      </div>
      <div className="space-y-2">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">{member.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.relation}</p>
            </div>
            <Switch checked={member.sharingEnabled} onCheckedChange={() => toggleSharing(member.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
