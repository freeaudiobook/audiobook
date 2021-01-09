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
	title           string
	author          string
	genre           []string
	description     string
	language        string
	librivoxPageUrl string
	totalDuration   string
}

type Row struct {
	_id     map[string]string
	details Details
	tracks  []map[string]string
	id      int
}

type Rows struct {
	data []Row `json:"data"`
}

func main() {
	jsonDataFromFile, err := ioutil.ReadFile("./data/audiobooks.json")

	if err != nil {
		fmt.Println(err)
	}

	var jsonData Rows

	err = json.Unmarshal([]byte(jsonDataFromFile), &jsonData)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(len(jsonData.data))

	file, err := os.Create("audiobooks.csv")
	if err != nil {
		log.Fatal("Cannot create file", err)
	}

	writer := csv.NewWriter(file)

	writer.Write([]string{"title", "librivox_url", "genre", "author", "summary", "language", "total_duration"})

	for _, r := range jsonData.data {
		var record []string

		record = append(record, r.details.title)
		record = append(record, r.details.librivoxPageUrl)
		record = append(record, strings.Join(r.details.genre, ","))
		record = append(record, r.details.author)
		record = append(record, r.details.description)
		record = append(record, r.details.language)
		record = append(record, r.details.totalDuration)

		writer.Write(record)
	}

	writer.Flush()
	file.Close()
}
