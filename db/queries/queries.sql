-- name: NewSeekPosition :exec
INSERT into PLAYSTATE(user_id, book_chapter, seek_position) values($1,$2, $3);

-- name: UpdateSeekPosition :exec
INSERT INTO PLAYSTATE(user_id, book_chapter, seek_position) values ($1, $2, $3)
ON CONFLICT (user_id, book_chapter) DO UPDATE SET seek_position = $3;

-- name: FetchBooksByTitleAndAuthor :many
SELECT * FROM BOOKS where title LIKE '%' || $1 || '%' and author LIKE '%' || $2 || '%' ORDER BY title;

-- name: FetchBooksByGenre :many
SELECT * FROM BOOKS where genre like '%' || $1 || '%' ORDER BY title;

-- name: GetAllBooks :many
SELECT * FROM BOOKS;