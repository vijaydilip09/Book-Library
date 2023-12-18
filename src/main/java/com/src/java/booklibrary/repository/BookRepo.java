package com.src.java.booklibrary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.src.java.booklibrary.model.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Long>{

	List<Book> findByAuthorName(String author);
	List<Book> findBybookTitle(String bookTitle);
}
