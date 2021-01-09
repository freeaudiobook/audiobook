-- migrate:up
CREATE TABLE PLAYSTATE (
	user_id UUID,
	book_chapter string,
	seek_position int
)


-- migrate:down
DELETE TABLE PLAYSTATE

