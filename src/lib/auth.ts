export type UserRole = "patient" | "doctor" | "family";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  linkedPatients: string[];
  myPatientId: string;
}

const AUTH_STORAGE_KEY = "vitalsync_user";
const USERS_STORAGE_KEY = "vitalsync_users";

interface StoredUser extends AuthUser {
  password: string;
}

export function getCurrentUser(): AuthUser | null {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function saveCurrentUser(user: AuthUser): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function getStoredUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    localStorage.removeItem(USERS_STORAGE_KEY);
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function registerUser(user: AuthUser, password: string): void {
  const users = getStoredUsers();
  const filtered = users.filter((item) => item.email !== user.email);
  filtered.push({ ...user, password });
  saveStoredUsers(filtered);
  saveCurrentUser(user);
}

export function loginUser(email: string, password: string): AuthUser | null {
  const user = getStoredUsers().find((item) => item.email === email && item.password === password);
  if (!user) {
    return null;
  }

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    linkedPatients: user.linkedPatients,
    myPatientId: user.myPatientId,
  };

  saveCurrentUser(authUser);
  return authUser;
}

export function clearCurrentUser(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function roleHomePath(role: UserRole): string {
  if (role === "doctor") {
    return "/doctor";
  }

  if (role === "family") {
    return "/family";
  }

  return "/dashboard";
}
