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
	if q.addBookStmt, err = db.PrepareContext(ctx, addBook); err != nil {
		return nil, fmt.Errorf("error preparing query AddBook: %w", err)
	}
	if q.fetchBooksByGenreStmt, err = db.PrepareContext(ctx, fetchBooksByGenre); err != nil {
		return nil, fmt.Errorf("error preparing query FetchBooksByGenre: %w", err)
	}
	if q.fetchBooksByTitleOrAuthorStmt, err = db.PrepareContext(ctx, fetchBooksByTitleOrAuthor); err != nil {
		return nil, fmt.Errorf("error preparing query FetchBooksByTitleAndAuthor: %w", err)
	}
	if q.getAllBooksStmt, err = db.PrepareContext(ctx, getAllBooks); err != nil {
		return nil, fmt.Errorf("error preparing query GetAllBooks: %w", err)
	}
	if q.getBookByIDStmt, err = db.PrepareContext(ctx, getBookByID); err != nil {
		return nil, fmt.Errorf("error preparing query GetBookByID: %w", err)
	}
	if q.getSeekPositionStmt, err = db.PrepareContext(ctx, getSeekPosition); err != nil {
		return nil, fmt.Errorf("error preparing query GetSeekPosition: %w", err)
	}
	if q.updateSeekPositionStmt, err = db.PrepareContext(ctx, updateSeekPosition); err != nil {
		return nil, fmt.Errorf("error preparing query UpdateSeekPosition: %w", err)
	}
	return &q, nil
}

func (q *Queries) Close() error {
	var err error
	if q.addBookStmt != nil {
		if cerr := q.addBookStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing addBookStmt: %w", cerr)
		}
	}
	if q.fetchBooksByGenreStmt != nil {
		if cerr := q.fetchBooksByGenreStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing fetchBooksByGenreStmt: %w", cerr)
		}
	}
	if q.fetchBooksByTitleOrAuthorStmt != nil {
		if cerr := q.fetchBooksByTitleOrAuthorStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing fetchBooksByTitleAndAuthorStmt: %w", cerr)
		}
	}
	if q.getAllBooksStmt != nil {
		if cerr := q.getAllBooksStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing getAllBooksStmt: %w", cerr)
		}
	}
	if q.getBookByIDStmt != nil {
		if cerr := q.getBookByIDStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing getBookByIDStmt: %w", cerr)
		}
	}
	if q.getSeekPositionStmt != nil {
		if cerr := q.getSeekPositionStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing getSeekPositionStmt: %w", cerr)
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
	db                            DBTX
	tx                            *sql.Tx
	addBookStmt                   *sql.Stmt
	fetchBooksByGenreStmt         *sql.Stmt
	fetchBooksByTitleOrAuthorStmt *sql.Stmt
	getAllBooksStmt               *sql.Stmt
	getBookByIDStmt               *sql.Stmt
	getSeekPositionStmt           *sql.Stmt
	updateSeekPositionStmt        *sql.Stmt
}

func (q *Queries) WithTx(tx *sql.Tx) *Queries {
	return &Queries{
		db:                            tx,
		tx:                            tx,
		addBookStmt:                   q.addBookStmt,
		fetchBooksByGenreStmt:         q.fetchBooksByGenreStmt,
		fetchBooksByTitleOrAuthorStmt: q.fetchBooksByTitleOrAuthorStmt,
		getAllBooksStmt:               q.getAllBooksStmt,
		getBookByIDStmt:               q.getBookByIDStmt,
		getSeekPositionStmt:           q.getSeekPositionStmt,
		updateSeekPositionStmt:        q.updateSeekPositionStmt,
	}
}
