-- name: GetSeekPosition :one
SELECT seek_position from PLAYSTATE where user_id=$1 AND book_chapter=$2;

-- name: UpdateSeekPosition :exec
INSERT INTO PLAYSTATE(user_id, book_chapter, seek_position) values ($1, $2, $3)
ON CONFLICT (user_id, book_chapter) DO UPDATE SET seek_position = $3;

-- name: FetchBooksByTitleAndAuthor :many
SELECT * FROM BOOKS where title LIKE '%' || $1 || '%' and author LIKE '%' || $2 || '%' ORDER BY title;

-- name: FetchBooksByGenre :many
SELECT * FROM BOOKS where genre like '%' || $1 || '%' ORDER BY title;

-- name: GetAllBooks :many
SELECT * FROM BOOKS;

-- name: GetBookByID :one
SELECT * FROM  BOOKS where book_id=$1;

-- name: AddBook :exec
INSERT into BOOKS(book_id, title, image_url, librivox_url, genre, author, summary, language, total_duration) values($1,$2,$3,$4,$5,$6,$7,$8,$9);