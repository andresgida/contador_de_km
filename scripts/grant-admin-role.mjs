/**
 * Asigna role: "admin" a un usuario existente en Supabase Auth.
 * Requiere SUPABASE_SERVICE_ROLE_KEY en .env (Settings → API → service_role).
 *
 * Uso: node scripts/grant-admin-role.mjs tu@correo.com
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");

function loadEnv() {
  const raw = readFileSync(envPath, "utf8");
  const vars = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    vars[key] = rest.join("=").trim();
  }
  return vars;
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.argv[2]?.trim().toLowerCase();

if (!url || !serviceKey) {
  console.error("Faltan VITE_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env");
  process.exit(1);
}

if (!email) {
  console.error("Uso: node scripts/grant-admin-role.mjs tu@correo.com");
  process.exit(1);
}

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  "Content-Type": "application/json",
};

const listRes = await fetch(
  `${url}/auth/v1/admin/users?per_page=200`,
  { headers }
);
const listBody = await listRes.json();

if (!listRes.ok) {
  console.error("Error listando usuarios:", listBody);
  process.exit(1);
}

const users = listBody.users ?? listBody;
const user = users.find((u) => u.email?.toLowerCase() === email);

if (!user) {
  console.error(`No existe un usuario con el correo: ${email}`);
  process.exit(1);
}

const updateRes = await fetch(`${url}/auth/v1/admin/users/${user.id}`, {
  method: "PUT",
  headers,
  body: JSON.stringify({
    user_metadata: {
      ...user.user_metadata,
      role: "admin",
    },
  }),
});

const updateBody = await updateRes.json();

if (!updateRes.ok) {
  console.error("Error actualizando usuario:", updateBody);
  process.exit(1);
}

console.log(`Listo: ${email} ahora tiene role "admin" en user_metadata.`);
console.log("Cierra sesión en la app e inicia de nuevo para aplicar el cambio.");
