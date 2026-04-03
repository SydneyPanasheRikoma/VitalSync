import { useState } from "react";
import { Users, MailPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Invite {
  id: string;
  email: string;
  role: "doctor" | "family";
  status: "sent" | "accepted";
}

const defaultInvites: Invite[] = [
  { id: "i-1", email: "dr.smith@clinic.org", role: "doctor", status: "accepted" },
  { id: "i-2", email: "linda.khalil@example.com", role: "family", status: "sent" },
];

export function FamilyConnect() {
  const [invites, setInvites] = useState<Invite[]>(defaultInvites);
  const [email, setEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"doctor" | "family">("family");

  const sendInvite = () => {
    if (!email.includes("@")) {
      return;
    }

    setInvites((prev) => [
      {
        id: `i-${Date.now()}`,
        email,
        role: inviteRole,
        status: "sent",
      },
      ...prev,
    ]);

    setEmail("");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-alert-low/10">
          <Users className="h-5 w-5 text-alert-low" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Care Team Invites</h3>
          <p className="text-xs text-muted-foreground">Invite doctors and family members by email</p>
        </div>
      </div>
      <div className="rounded-lg border border-border p-3 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2">
          <Input
            value={email}
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="button"
            variant={inviteRole === "family" ? "default" : "outline"}
            onClick={() => setInviteRole("family")}
          >
            Family
          </Button>
          <Button
            type="button"
            variant={inviteRole === "doctor" ? "default" : "outline"}
            onClick={() => setInviteRole("doctor")}
          >
            Doctor
          </Button>
        </div>
        <Button type="button" className="w-full" onClick={sendInvite}>
          <MailPlus className="h-4 w-4 mr-2" />
          Send Invite
        </Button>
      </div>
      <div className="space-y-2">
        {invites.map((invite) => (
          <div key={invite.id} className="flex items-center gap-3 p-2 rounded-lg border border-border bg-slate-50">
            <div className="flex-1">
              <p className="text-sm font-medium">{invite.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{invite.role}</p>
            </div>
            <Badge variant="outline" className="capitalize">
              {invite.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
