-- migrate:up
CREATE TABLE BOOKS (
	book_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
