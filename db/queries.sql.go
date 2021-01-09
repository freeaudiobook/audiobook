// Code generated by sqlc. DO NOT EDIT.
// source: queries.sql

package db

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

const newSeekPosition = `-- name: NewSeekPosition :exec
INSERT into PLAYSTATE(user_id, book_chapter, seek_position) values($1,$2, $3)
`

type NewSeekPositionParams struct {
	UserID       uuid.UUID      `json:"user_id"`
	BookChapter  sql.NullString `json:"book_chapter"`
	SeekPosition sql.NullInt32  `json:"seek_position"`
}

func (q *Queries) NewSeekPosition(ctx context.Context, arg NewSeekPositionParams) error {
	_, err := q.exec(ctx, q.newSeekPositionStmt, newSeekPosition, arg.UserID, arg.BookChapter, arg.SeekPosition)
	return err
}

const updateSeekPosition = `-- name: UpdateSeekPosition :exec
UPDATE PLAYSTATE SET seek_position=$3 where user_id=$1 and book_chapter=$2
`

type UpdateSeekPositionParams struct {
	UserID       uuid.UUID      `json:"user_id"`
	BookChapter  sql.NullString `json:"book_chapter"`
	SeekPosition sql.NullInt32  `json:"seek_position"`
}

func (q *Queries) UpdateSeekPosition(ctx context.Context, arg UpdateSeekPositionParams) error {
	_, err := q.exec(ctx, q.updateSeekPositionStmt, updateSeekPosition, arg.UserID, arg.BookChapter, arg.SeekPosition)
	return err
}
