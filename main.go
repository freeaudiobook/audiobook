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
		json.NewEncoder(w).Encode(map[string]string{"message": "unable to find books"})
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

func getBookById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	bookID, _ := uuid.Parse(vars["bookID"])
	book, err := database.GetBookByID(r.Context(), bookID)

	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "unable to find books"})
	}

	json.NewEncoder(w).Encode(book)
}

func getSeek(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	seekPostionArgs := db.GetSeekPositionParams{
		BookChapter: sql.NullString{vars["chapterURL"], true},
		UserID:      uuid.MustParse(vars["userID"]),
	}
	seek, err := database.GetSeekPosition(r.Context(), seekPostionArgs)

	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "unable to find books"})
	}

	o := strconv.Itoa(int(seek.Int32))
	w.Write([]byte(o))
}

func newBook(w http.ResponseWriter, r *http.Request) {

	var bookParams db.AddBookParams
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "unable to add book"})
	}
	json.Unmarshal(b, &bookParams)
	bookParams.BookID, _ = uuid.NewRandom()
	err = database.AddBook(r.Context(), bookParams)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "unable to add book"})
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "successfully added the book"})

}

func main() {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=require",
		dbHost,
		dbPort,
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

	router.HandleFunc("/api/user/{userID}/bookchapter/{chapterURL}/seek", createOrUpdateSeek).Methods("POST")
	router.HandleFunc("/api/user/{userID}/bookchapter/{chapterURL}/seek", getSeek).Methods("GET")
	router.HandleFunc("/api/books", listAllBooks).Methods("GET")
	router.HandleFunc("/api/books", newBook).Methods("POST")
	router.HandleFunc("/api/books/{bookID}", getBookById).Methods("GET")
	router.HandleFunc("/api/search", search).Methods("GET")

	router.PathPrefix("/static").Handler(http.StripPrefix("/static", http.FileServer(http.Dir("./my-app/build/static"))))
	router.PathPrefix("/assets").Handler(http.StripPrefix("/assets", http.FileServer(http.Dir("./my-app/build/assets"))))
	router.PathPrefix("/").HandlerFunc(serveUI)

	http.Handle("/", router)
	fmt.Println("Starting on port 8000")
	err = http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err)
	}
}

func serveUI(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./my-app/build/index.html")
}
