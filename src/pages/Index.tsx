import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ShieldCheck, HeartPulse, Users } from "lucide-react";
import {
	getCurrentUser,
	loginUser,
	registerUser,
	roleHomePath,
	type UserRole,
} from "@/lib/auth";

type AuthMode = "login" | "signup";

const roleOptions: Array<{ value: UserRole; label: string }> = [
	{ value: "patient", label: "Patient" },
	{ value: "doctor", label: "Doctor" },
	{ value: "family", label: "Family Member" },
];

const Index = () => {
	const navigate = useNavigate();
	const existingUser = getCurrentUser();

	const [mode, setMode] = useState<AuthMode>("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [role, setRole] = useState<UserRole>("patient");
	const [error, setError] = useState("");

	const canSubmit = useMemo(() => {
		if (!email || !password) {
			return false;
		}

		if (mode === "signup" && !name.trim()) {
			return false;
		}

		return true;
	}, [email, password, mode, name]);

	if (existingUser) {
		return <Navigate to={roleHomePath(existingUser.role)} replace />;
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");

		if (mode === "login") {
			const user = loginUser(email, password);
			if (!user) {
				setError("Invalid credentials. Create an account first or retry.");
				return;
			}

			navigate(roleHomePath(user.role));
			return;
		}

		const user = {
			id: `u-${Date.now()}`,
			email,
			role,
			name: name.trim(),
			linkedPatients: role === "family" ? ["1", "2"] : [],
			myPatientId: role === "patient" ? "1" : "",
		};

		registerUser(user, password);
		navigate(roleHomePath(user.role));
	};

	return (
		<div className="min-h-screen bg-background px-4 py-8 md:px-8 md:py-12">
			<div className="mx-auto grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
				<section className="border-b border-border bg-slate-50 p-8 md:border-b-0 md:border-r md:p-12">
					<div className="mb-10 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
							<img src="/vitalsync-icon.svg" alt="VitalSync icon" className="h-6 w-6" />
						</div>
						<div>
							<h1 className="text-2xl font-semibold text-slate-900">VitalSync AI</h1>
							<p className="text-sm text-slate-600">Always Watching, Always Connected</p>
						</div>
					</div>

					<div className="rounded-xl border border-border bg-white p-6">
						<svg viewBox="0 0 420 220" className="h-auto w-full" role="img" aria-label="Medical monitoring illustration">
							<rect x="20" y="20" width="380" height="180" rx="12" fill="#FFFFFF" stroke="#CBD5E1" />
							<path d="M50 135h45l18-35 22 62 18-42h28l20-22 16 37h47" fill="none" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
							<circle cx="113" cy="100" r="5" fill="#0D9488" />
							<circle cx="217" cy="98" r="5" fill="#0D9488" />
							<rect x="46" y="42" width="118" height="14" rx="4" fill="#E2E8F0" />
							<rect x="46" y="64" width="86" height="10" rx="4" fill="#E2E8F0" />
							<rect x="280" y="42" width="96" height="64" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
							<rect x="292" y="55" width="72" height="8" rx="4" fill="#0D9488" opacity="0.25" />
							<rect x="292" y="70" width="52" height="8" rx="4" fill="#0F172A" opacity="0.2" />
							<rect x="292" y="85" width="60" height="8" rx="4" fill="#0F172A" opacity="0.2" />
						</svg>
						<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
							<div className="rounded-lg border border-border bg-slate-50 p-3">
								<HeartPulse className="mb-2 h-4 w-4 text-vital-heart" />
								<p className="text-xs text-muted-foreground">Vital trend analysis</p>
							</div>
							<div className="rounded-lg border border-border bg-slate-50 p-3">
								<ShieldCheck className="mb-2 h-4 w-4 text-primary" />
								<p className="text-xs text-muted-foreground">24-48h risk prediction</p>
							</div>
							<div className="rounded-lg border border-border bg-slate-50 p-3">
								<Users className="mb-2 h-4 w-4 text-slate-700" />
								<p className="text-xs text-muted-foreground">Role-based access</p>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-white p-8 md:p-12">
					<Card className="border-border shadow-sm">
						<CardHeader className="space-y-2">
							<div className="inline-flex rounded-lg border border-border p-1">
								<Button
									type="button"
									variant={mode === "login" ? "default" : "ghost"}
									className="h-8 px-5"
									onClick={() => setMode("login")}
								>
									Login
								</Button>
								<Button
									type="button"
									variant={mode === "signup" ? "default" : "ghost"}
									className="h-8 px-5"
									onClick={() => setMode("signup")}
								>
									Sign Up
								</Button>
							</div>
							<CardTitle className="text-xl font-semibold text-slate-900">
								{mode === "login" ? "Sign in to VitalSync AI" : "Create your VitalSync AI account"}
							</CardTitle>
							<CardDescription>
								Secure access to role-based monitoring dashboards.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="space-y-4" onSubmit={handleSubmit}>
								{mode === "signup" && (
									<div className="space-y-2">
										<Label htmlFor="name">Full Name</Label>
										<Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Johnson" />
									</div>
								)}
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@hospital.org" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
								</div>

								{mode === "signup" && (
									<div className="space-y-2">
										<Label>I am a:</Label>
										<Select value={role} onValueChange={(next) => setRole(next as UserRole)}>
											<SelectTrigger>
												<SelectValue placeholder="Select role" />
											</SelectTrigger>
											<SelectContent>
												{roleOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								)}

								<Button type="submit" className="w-full" disabled={!canSubmit}>
									{mode === "login" ? "Login" : "Create Account"}
								</Button>
								{error ? <p className="text-sm text-alert-critical">{error}</p> : null}
							</form>
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
};

export default Index;
