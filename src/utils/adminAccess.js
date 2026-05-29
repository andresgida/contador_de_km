const adminEmails = (import.meta.env.VITE_ADMIN_EMAIL ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function getAdminEmails() {
  return adminEmails;
}

export function getUserRole(user) {
  return user?.app_metadata?.role ?? user?.user_metadata?.role ?? null;
}

export function isAdminUser(session) {
  const user = session?.user;
  if (!user) return false;

  if (getUserRole(user) === "admin") {
    return true;
  }

  const email = user.email?.trim().toLowerCase();
  if (!email || adminEmails.length === 0) {
    return false;
  }

  return adminEmails.includes(email);
}
