package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
	"github.com/mmcdole/gofeed"
)

type BookWithChapters struct {
	Title    string
	Chapters []Chapter
}

type Chapter struct {
	Title string
	Link  string
}

//NewBookWithChapters produces chapter audio links given a chapter level RSS feed link
func NewBookWithChapters(path string) BookWithChapters {
	fp := gofeed.NewParser()
	feed, _ := fp.ParseURL(path)

	chapters := []Chapter{}

	for _, v := range feed.Items {
		ch := Chapter{
			Title: v.Title,
			Link:  v.Extensions["media"]["content"][0].Attrs["url"],
		}

		chapters = append(chapters, ch)
	}

	book := BookWithChapters{
		Title:    feed.Title,
		Chapters: chapters,
	}

	return book
}

func FetchAudioChapters(mainPageLink string) BookWithChapters {
	res, err := http.Get(mainPageLink)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	var book BookWithChapters
	doc.Find(".book-download-btn").Each(func(i int, s *goquery.Selection) {
		if s.Text() == "RSS" {
			rssLink, exists := s.Attr("href")

			if !exists {
				fmt.Println("Rss feed Doesn't exist")
			}

			book = NewBookWithChapters(rssLink)
		}
	})

	return book
}
