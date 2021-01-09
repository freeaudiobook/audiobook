package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/user/{userID}/bookchapter/{chapterURL}/seek", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		chapterURL := vars["chapterURL"]
		w.Write([]byte(chapterURL))
	}).Methods("POST")

	http.Handle("/", router)
	fmt.Println("Starting on port 8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err)
	}
}
