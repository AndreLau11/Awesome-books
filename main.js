const books = document.getElementById("bookBase");
const addForm = document.getElementById("bookForm");
const newBookTitle = document.getElementById("bookTitle").value;
const newBookAuthor = document.getElementById("bookAuthor").value;
const addButton = document.getElementById("addButton");

let bookListArray = JSON.parse(localStorage.getItem("bookListArray") || "[]");

function loadStorage() {
    for (let i = 0; i<bookListArray.length; i+=1){
        books.innerHTML += `<div id="book${i}" class='bookMark'>
        <p>${bookListArray[i].title}</p>
        <p>${bookListArray[i].author}</p>
        <button id="button${i}" type="submit">Remove</button>
        <hr>
    </div>`;
    }
    localStorage.setItem("bookListArray", JSON.stringify(bookListArray));
    console.log(JSON.parse(localStorage.getItem("bookListArray")))
};

// Add a new book to the list of books

function addition (){
    bookListArray.push({title: document.getElementById("bookTitle").value, author: document.getElementById("bookAuthor").value});
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    location.reload();
    loadStorage();
};

addForm.addEventListener('submit', (event) => {
    addition();
    event.preventDefault();
  });

// remove an element from the list

// function remove () {
// const index = 
// }

document.addEventListener('DOMContentLoaded', loadStorage, false);