package main

import (
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
