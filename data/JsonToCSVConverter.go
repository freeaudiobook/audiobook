package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

type Details struct {
	Title            string   `json:"title"`
	AuthorID         int      `json:"authorId"`
	Author           string   `json:"author"`
	Genres           []string `json:"genres"`
	YearOfPublishing int      `json:"yearOfPublishing"`
	Language         string   `json:"language"`
	ReaderID         int      `json:"readerId"`
	Reader           string   `json:"reader"`
	YoutubeVideoURL  string   `json:"youtubeVideoUrl"`
	LibrivoxPageURL  string   `json:"librivoxPageUrl"`
	TotalDuration    string   `json:"totalDuration"`
	Description      string   `json:"description"`
}

type Track struct {
	Title    string `json:"title"`
	URL      string `json:"url"`
	Duration string `json:"duration"`
}

type Row struct {
	ID2 struct {
		Oid string `json:"oid"`
	} `json:"_id"`
	Details Details `json:"details"`
	Tracks  []Track `json:"tracks"`
	ID      int     `json:"id"`
	ImgUrl  string  `json:"imgUrl"`
}

type Rows struct {
	Data []Row `json:"data"`
}

func main() {
	jsonDataFromFile, err := ioutil.ReadFile("./data/audiobooks.json")

	if err != nil {
		fmt.Println(err)
	}

	var jsonData Rows

	err = json.Unmarshal(jsonDataFromFile, &jsonData)

	if err != nil {
		panic(err)
	}

	file, err := os.Create("audiobooks.csv")
	if err != nil {
		log.Fatal("Cannot create file", err)
	}

	writer := csv.NewWriter(file)
	writer.Comma = '|'
	writer.Write([]string{"title", "image_url", "librivox_url", "genre", "author", "summary", "language", "total_duration"})

	for _, r := range jsonData.Data {
		var record []string

		record = append(record, r.Details.Title)
		record = append(record, r.ImgUrl)
		record = append(record, r.Details.LibrivoxPageURL)
		record = append(record, strings.Join(r.Details.Genres, ","))
		record = append(record, r.Details.Author)
		record = append(record, r.Details.Description)
		record = append(record, r.Details.Language)
		record = append(record, r.Details.TotalDuration)

		writer.Write(record)
	}

	writer.Flush()
	file.Close()
}
