-- migrate:up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE BOOKS (
	book_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	title varchar,
    image_url varchar,
    librivox_url varchar,
    genre varchar,
    author varchar,
    summary varchar,
    language varchar,
    total_duration varchar
)

-- migrate:down
DELETE TABLE BOOKS
