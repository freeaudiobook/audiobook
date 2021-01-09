-- name: NewSeekPosition :exec
INSERT into PLAYSTATE(user_id, book_chapter, seek_position) values($1,$2, $3);

-- name: UpdateSeekPosition :exec
UPDATE PLAYSTATE SET seek_position=$3 where user_id=$1 and book_chapter=$2;