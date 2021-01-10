-- migrate:up
ALTER TABLE PLAYSTATE ALTER COLUMN user_id  TYPE string;

-- migrate:down
ALTER TABLE PLAYSTATE ALTER COLUMN user_id  TYPE UUID;

