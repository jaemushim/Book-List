class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    // create tr element
    const row = document.createElement("tr");
    // insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>
        `;
    document.getElementById("tbody").appendChild(row);
  }

  // Clear Fields
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  // Show Alert
  showAlert(message, alertType) {
    //create div
    const div = document.createElement("div");
    div.innerText = message;
    div.className = `alert ${alertType}`;
    document
      .getElementById("card")
      .insertBefore(div, document.getElementById("form"));

    setTimeout(function () {
      div.remove();
    }, 2000);
  }
}

class LocalStorage {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBook() {
    const books = LocalStorage.getBooks();
    books.forEach(function (book) {
      const ui = new UI();
      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = LocalStorage.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static deleteBook(isbn) {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    books.forEach(function (item, index) {
      if (item.isbn == isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Dom Load Event
document.addEventListener("DOMContentLoaded", LocalStorage.displayBook);

// Event Listener
document.getElementById("form").addEventListener("submit", function (e) {
  // get form value
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // instantiate book
  const book = new Book(title, author, isbn);

  // instantiate ui
  const ui = new UI();

  // validation
  if (title == "" || author == "" || isbn == "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // instantiate ui
    const ui = new UI();

    ui.showAlert("Book Added!", "success");

    // add book to list
    ui.addBookToList(book);

    // Add to LS
    LocalStorage.addBook(book);

    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById("table").addEventListener("click", function (e) {
  if (e.target.className == "delete") {
    LocalStorage.deleteBook(
      e.target.parentNode.previousElementSibling.innerText
    );

    e.target.parentNode.parentNode.remove();
    // instantiate ui
    const ui = new UI();
    // show alert
    ui.showAlert("Book deleted!", "success");
  }
});
