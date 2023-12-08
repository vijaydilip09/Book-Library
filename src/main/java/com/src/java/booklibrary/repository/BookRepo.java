package com.src.java.booklibrary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.src.java.booklibrary.model.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Long>{
	

}
