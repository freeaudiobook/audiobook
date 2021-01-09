// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"context"
	"database/sql"
	"fmt"
)

type DBTX interface {
	ExecContext(context.Context, string, ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

func New(db DBTX) *Queries {
	return &Queries{db: db}
}

func Prepare(ctx context.Context, db DBTX) (*Queries, error) {
	q := Queries{db: db}
	var err error
	if q.fetchBooksByGenreStmt, err = db.PrepareContext(ctx, fetchBooksByGenre); err != nil {
		return nil, fmt.Errorf("error preparing query FetchBooksByGenre: %w", err)
	}
	if q.fetchBooksByTitleAndAuthorStmt, err = db.PrepareContext(ctx, fetchBooksByTitleAndAuthor); err != nil {
		return nil, fmt.Errorf("error preparing query FetchBooksByTitleAndAuthor: %w", err)
	}
	if q.getAllBooksStmt, err = db.PrepareContext(ctx, getAllBooks); err != nil {
		return nil, fmt.Errorf("error preparing query GetAllBooks: %w", err)
	}
	if q.newSeekPositionStmt, err = db.PrepareContext(ctx, newSeekPosition); err != nil {
		return nil, fmt.Errorf("error preparing query NewSeekPosition: %w", err)
	}
	if q.updateSeekPositionStmt, err = db.PrepareContext(ctx, updateSeekPosition); err != nil {
		return nil, fmt.Errorf("error preparing query UpdateSeekPosition: %w", err)
	}
	return &q, nil
}

func (q *Queries) Close() error {
	var err error
	if q.fetchBooksByGenreStmt != nil {
		if cerr := q.fetchBooksByGenreStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing fetchBooksByGenreStmt: %w", cerr)
		}
	}
	if q.fetchBooksByTitleAndAuthorStmt != nil {
		if cerr := q.fetchBooksByTitleAndAuthorStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing fetchBooksByTitleAndAuthorStmt: %w", cerr)
		}
	}
	if q.getAllBooksStmt != nil {
		if cerr := q.getAllBooksStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing getAllBooksStmt: %w", cerr)
		}
	}
	if q.newSeekPositionStmt != nil {
		if cerr := q.newSeekPositionStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing newSeekPositionStmt: %w", cerr)
		}
	}
	if q.updateSeekPositionStmt != nil {
		if cerr := q.updateSeekPositionStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing updateSeekPositionStmt: %w", cerr)
		}
	}
	return err
}

func (q *Queries) exec(ctx context.Context, stmt *sql.Stmt, query string, args ...interface{}) (sql.Result, error) {
	switch {
	case stmt != nil && q.tx != nil:
		return q.tx.StmtContext(ctx, stmt).ExecContext(ctx, args...)
	case stmt != nil:
		return stmt.ExecContext(ctx, args...)
	default:
		return q.db.ExecContext(ctx, query, args...)
	}
}

func (q *Queries) query(ctx context.Context, stmt *sql.Stmt, query string, args ...interface{}) (*sql.Rows, error) {
	switch {
	case stmt != nil && q.tx != nil:
		return q.tx.StmtContext(ctx, stmt).QueryContext(ctx, args...)
	case stmt != nil:
		return stmt.QueryContext(ctx, args...)
	default:
		return q.db.QueryContext(ctx, query, args...)
	}
}

func (q *Queries) queryRow(ctx context.Context, stmt *sql.Stmt, query string, args ...interface{}) *sql.Row {
	switch {
	case stmt != nil && q.tx != nil:
		return q.tx.StmtContext(ctx, stmt).QueryRowContext(ctx, args...)
	case stmt != nil:
		return stmt.QueryRowContext(ctx, args...)
	default:
		return q.db.QueryRowContext(ctx, query, args...)
	}
}

type Queries struct {
	db                             DBTX
	tx                             *sql.Tx
	fetchBooksByGenreStmt          *sql.Stmt
	fetchBooksByTitleAndAuthorStmt *sql.Stmt
	getAllBooksStmt                *sql.Stmt
	newSeekPositionStmt            *sql.Stmt
	updateSeekPositionStmt         *sql.Stmt
}

func (q *Queries) WithTx(tx *sql.Tx) *Queries {
	return &Queries{
		db:                             tx,
		tx:                             tx,
		fetchBooksByGenreStmt:          q.fetchBooksByGenreStmt,
		fetchBooksByTitleAndAuthorStmt: q.fetchBooksByTitleAndAuthorStmt,
		getAllBooksStmt:                q.getAllBooksStmt,
		newSeekPositionStmt:            q.newSeekPositionStmt,
		updateSeekPositionStmt:         q.updateSeekPositionStmt,
	}
}
