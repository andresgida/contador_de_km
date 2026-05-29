-- =============================================================================
-- Otorgar rol de administrador a un usuario (Supabase Auth)
-- =============================================================================
-- Dónde ejecutarlo: Supabase Dashboard → SQL Editor → New query → Run
--
-- La app lee: user_metadata.role o app_metadata.role === 'admin'
-- Tras ejecutar: cierra sesión en la app e inicia sesión de nuevo.
-- =============================================================================

-- 1) Asignar role "admin" en user_metadata (recomendado)
UPDATE auth.users
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'andresgida@gmail.com';

-- 2) Opcional: mismo rol en app_metadata (solo si prefieres app_metadata)
-- UPDATE auth.users
-- SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
-- WHERE email = 'andresgida@gmail.com';

-- 3) Verificar que quedó aplicado
SELECT
  id,
  email,
  raw_user_meta_data->>'role' AS user_metadata_role,
  raw_app_meta_data->>'role' AS app_metadata_role,
  created_at
FROM auth.users
WHERE email = 'andresgida@gmail.com';

-- =============================================================================
-- Otros usuarios: cambia el correo en el WHERE o asigna a varios:
-- =============================================================================
-- UPDATE auth.users
-- SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
-- WHERE email IN ('andresgida@gmail.com', 'otro@correo.com');

-- =============================================================================
-- Quitar rol admin (revertir)
-- =============================================================================
-- UPDATE auth.users
-- SET raw_user_meta_data = raw_user_meta_data - 'role'
-- WHERE email = 'andresgida@gmail.com';
