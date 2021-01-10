-- migrate:up
ALTER TABLE PLAYSTATE ADD CONSTRAINT uniq_user_id_book_chapter UNIQUE(user_id, book_chapter);

-- migrate:down
ALTER TABLE PLAYSTATE DROP CONSTRAINT uniq_user_id_book_chapter;
