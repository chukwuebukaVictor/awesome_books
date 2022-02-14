
export class Book {
    constructor(title, author) {
      this.id = Date.now().toString();
      this.title = title;
      this.author = author;
    }
  
    static books = [
      {
        id: "001",
        title: "The Trial",
        author: "Franz Kafka",
      },
      {
        id: "002",
        title: "Harry Potter",
        author: "J. K. Rowling",
      },
    ];
  
    static addToLocalStorage(data) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  
    static addToBooks(book) {
      this.books.push(book);
      this.addToLocalStorage(this.books);
    }
  
    static removeBook(ref) {
      const result = this.books.filter((value) => value.id !== ref);
      this.books = result;
      this.addToLocalStorage(this.books);
    }
  }

