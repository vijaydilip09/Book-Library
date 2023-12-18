package com.src.java.booklibrary.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.src.java.booklibrary.exception.ResourceNotFoundException;
import com.src.java.booklibrary.model.Book;
import com.src.java.booklibrary.repository.BookRepo;

@RestController
@RequestMapping("/api/v1")
public class BookController {
	
	@Autowired
	private BookRepo bookrepo;
	
	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/books")
	public List<Book> getAllBooks(){
		return bookrepo.findAll();
	}
	
	
	@CrossOrigin(origins = "http://localhost:4200/")
	@PostMapping("/books")
	public Book createBook(@RequestBody Book book)
	{
		return bookrepo.save(book);
	}
	
	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping("/books/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable Long id)
	{
		Book book = bookrepo.findById(id).
				orElseThrow(() -> new ResourceNotFoundException ("Book not exist with id: "+id));
		return ResponseEntity.ok(book);
	}
	
	@CrossOrigin(origins = "http://localhost:4200/")
	 @GetMapping("/books/author/{author}")
	    public ResponseEntity<List<Book>> getBooksByAuthor(@PathVariable String author) {
	        List<Book> books = bookrepo.findByAuthorName(author);
	        if (books.isEmpty()) {
	            // Handle not found case
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(books);
	    }
	
	@CrossOrigin(origins = "http://localhost:4200/")
	 @GetMapping("/books/Title/{title}")
	    public ResponseEntity<List<Book>> getBooksByTitle(@PathVariable String title) {
	        List<Book> books = bookrepo.findBybookTitle(title);
	        if (books.isEmpty()) {
	            // Handle not found case
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(books);
	    }
	
	
	@CrossOrigin(origins = "http://localhost:4200/")
	@PutMapping("/books/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable Long id,@RequestBody Book bookDetails)
	{
		
		Book book = bookrepo.findById(id).
				orElseThrow(() -> new ResourceNotFoundException ("Book not exist with id: "+id));
		book.setBookTitle(bookDetails.getBookTitle());
		book.setAuthorName(bookDetails.getAuthorName());
		book.setPublicationYear(bookDetails.getPublicationYear());
		
		Book updatedBook = bookrepo.save(book);
		
		return ResponseEntity.ok(updatedBook);
	}
	@CrossOrigin(origins = "http://localhost:4200/")
	@DeleteMapping("/books/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id)
	{
		Book book = bookrepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException ("Book not exist with id: "+id));
		bookrepo.delete(book);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	
	}
}
