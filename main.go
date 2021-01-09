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
	_ "github.com/lib/pq"
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

func search(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()

	var books []db.Book
	var err error

	if genre, found := queryParams["genre"]; found {
		books, err = database.FetchBooksByGenre(r.Context(), sql.NullString{genre[0], true})
	} else {
		searchParams := db.FetchBooksByTitleAndAuthorParams{
			Column1: sql.NullString{queryParams["title"][0], true},
			Column2: sql.NullString{queryParams["author"][0], true},
		}
		books, err = database.FetchBooksByTitleAndAuthor(r.Context(), searchParams)
	}

	if err != nil {
		http.Error(w, "Couldn't fetch books", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(books)
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
		log.Fatalln("Couldn't connect to postgres", err)
		return
	}
	defer c.Close()
	database = db.New(c)
	router := mux.NewRouter()

	router.HandleFunc("/user/{userID}/bookchapter/{chapterURL}/seek", createOrUpdateSeek).Methods("POST")
	router.HandleFunc("/books", listAllBooks).Methods("POST")
	// router.HandleFunc("/books/{bookID}", createOrUpdateSeek).Methods("POST")
	router.HandleFunc("/search", search).Methods("GET")

	http.Handle("/", router)
	fmt.Println("Starting on port 8000")
	err = http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err)
	}
}
