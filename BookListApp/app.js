// Book Class: Represents a book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList (book) {
        const list = document.getElementById('book-list');
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">&times;</a></td>
        `;
        
        list.appendChild(row);
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            
            // show success message
            UI.showAlert('Book Removed', 'success');
            
            // Remove book from store
            Store.removeBook(el.parentElement.previousElementSibling.textContent);
        }
    }
    
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    
    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) books = [];
        else books = JSON.parse(localStorage.getItem('books'));
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        
        localStorage.setItem('books',JSON.stringify(books));
    }
}

// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book 
document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    // Validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill in all Fields", "danger");
    } else {
        //Instatiate Book
        const book = new Book(title, author, isbn);

        
        
        // Add book to UI
        UI.addBookToList(book);
        
        // Add book to store
        Store.addBook(book);

        // Show success message
        UI.showAlert('Book Added', 'success');
        
        //clear feilds
        UI.clearFields();
    }
    
    
    
    
});

// Event: Remove a Book
document.getElementById('book-list').addEventListener('click', (e) => {
    // remove book from UI
    UI.deleteBook(e.target);
    
    // Remove book from store
    //Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
});

