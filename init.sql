CREATE TABLE public.cleaning_bot_log (
    id serial PRIMARY KEY,
    timestamp TIMESTAMP,
    result integer,
    commands integer,
    duration float8);
