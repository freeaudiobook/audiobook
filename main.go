package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/extrasalt/audiobook/db"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func createOrUpdateSeek(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	newSeek := db.NewSeekPositionParams{
		SeekPosition: sql.NullInt32{0, true},
		BookChapter:  sql.NullString{vars["chapterURL"], true},
		UserID:       uuid.MustParse(vars["userID"]),
	}

	err := database.NewSeekPosition(r.Context(), newSeek)
	if err != nil {
		w.Write([]byte("Unable to write seek postion"))
	}
}

var database *db.Queries

func main() {
	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		dbHost,
		5432,
		dbUser,
		dbPassword,
		dbName,
	)

	c, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalln("Couldn't connect to postgres")
		return
	}
	defer c.Close()
	database = db.New(c)
	router := mux.NewRouter()

	router.HandleFunc("/user/{userID}/bookchapter/{chapterURL}/seek", createOrUpdateSeek).Methods("POST")

	http.Handle("/", router)
	fmt.Println("Starting on port 8000")
	err = http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err)
	}
}
