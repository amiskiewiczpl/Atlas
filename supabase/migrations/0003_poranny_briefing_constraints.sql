-- ATLAS HQ v0.1 — idempotentny poranny briefing

create unique index if not exists idx_check_iny_user_dzien_typ
on check_iny(user_id, dzien_id, typ);
