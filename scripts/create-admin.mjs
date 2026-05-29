/**
 * Crea el usuario administrador en Supabase Auth.
 * Uso: node scripts/create-admin.mjs [contraseña]
 *
 * Lee VITE_* desde .env en la raíz del proyecto.
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
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
const email = env.VITE_ADMIN_EMAIL;
const password = process.argv[2];

if (!url || !key || !email) {
  console.error("Faltan VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY o VITE_ADMIN_EMAIL en .env");
  process.exit(1);
}

if (!password || password.length < 8) {
  console.error("Uso: node scripts/create-admin.mjs <contraseña-min-8-caracteres>");
  process.exit(1);
}

const response = await fetch(`${url}/auth/v1/signup`, {
  method: "POST",
  headers: {
    apikey: key,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
    data: { role: "admin" },
  }),
});

const body = await response.json();

if (!response.ok) {
  console.error("Error:", body.msg || body.error_description || body);
  process.exit(1);
}

console.log(`Administrador creado: ${email}`);
if (body.user && !body.session) {
  console.log("Si Supabase exige confirmación de correo, desactívala en Authentication → Providers → Email o confirma el usuario manualmente.");
}
