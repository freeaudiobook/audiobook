package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/extrasalt/audiobook/db"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func createOrUpdateSeek(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Seek position not found", http.StatusBadRequest)
		return
	}

	seekPosition, err := strconv.Atoi(string(body))
	if err != nil {
		http.Error(w, "Seek position not found", http.StatusBadRequest)
		return
	}

	newSeek := db.UpdateSeekPositionParams{
		SeekPosition: sql.NullInt32{int32(seekPosition), true},
		BookChapter:  sql.NullString{vars["chapterURL"], true},
		UserID:       uuid.MustParse(vars["userID"]),
	}

	err = database.UpdateSeekPosition(r.Context(), newSeek)
	if err != nil {
		w.Write([]byte("Unable to write seek position"))
	}
}

var database *db.Queries

func listAllBooks(w http.ResponseWriter, r *http.Request) {
	books, err := database.GetAllBooks(r.Context())

	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "unable to find books"})
	}

	json.NewEncoder(w).Encode(books)
}

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
	router.HandleFunc("/books", listAllBooks).Methods("POST")
	// router.HandleFunc("/books/{bookID}", createOrUpdateSeek).Methods("POST")

	http.Handle("/", router)
	fmt.Println("Starting on port 8000")
	err = http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err)
	}
}
