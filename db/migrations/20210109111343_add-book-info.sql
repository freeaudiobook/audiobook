-- migrate:up
CREATE TABLE BOOKS (
	book_id UUID,
	title string,
    image_url string,
    librivox_url string,
    genre string,
    author string,
    summary string,
    language string,
    total_duration string
)

-- migrate:down
DELETE TABLE BOOKS