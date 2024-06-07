const STORAGE_KEY = "books";
const RENDER_EVENT = "renderBooks";

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    books = data; 
  }
  console.log(data)
  document.dispatchEvent(new Event(RENDER_EVENT));
  renderBooks(); 
  return data;
}

document.addEventListener('DOMContentLoaded', function () {
  loadDataFromStorage();
});

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
let books = [];
let newBookTitle = "";
let storageKey = "books";

function handleAddBook() {
  const titleInput = document.getElementById("newBookTitle");
  const authorInput = document.getElementById("newBookAuthor"); 
  const yearInput = document.getElementById("newBookYear");
  const addBookButton = document.getElementById("addBookButton"); // Mengambil tombol tambah buku

  newBookTitle = titleInput.value.trim();
  const newBookAuthor = authorInput.value.trim();
  // const newBookYear = yearInput.value.trim();
  const newBookYear = parseInt(yearInput.value.trim()); // Konversi ke number menggunakan parseInt()

  

  if (newBookAuthor === "") {
    alert("Penulis tidak boleh kosong!");
    return;
  }

  if (isNaN(newBookYear === "")) {
    alert("Tahun tidak boleh kosong!");
    return;
  }
  
  
  


  if (newBookTitle !== "") {
    const newBook = {
      id: new Date().getTime(),
      title: newBookTitle,
      author: newBookAuthor, 
      year: newBookYear,
      isComplete: false,
    };
    books.push(newBook);
    titleInput.value = "";
    authorInput.value = ""; 
    yearInput.value = "";
    renderBooks();
  }
}

function handleMoveBook(id, target) {
  books = books.map((book) =>
    book.id === id ? { ...book, isComplete: target === "isComplete" } : book
  );
  renderBooks();
}

function handleDeleteBook(id) {
  books = books.filter((book) => book.id !== id);
  renderBooks();
}

function renderBooks() {
  localStorage.setItem(storageKey, JSON.stringify(books));

  const belumSelesaiList = document.getElementById("belumSelesaiList");
  const selesaiList = document.getElementById("selesaiList");
  belumSelesaiList.innerHTML = "";
  selesaiList.innerHTML = "";

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h4");
    title.textContent = book.title;
    const author = document.createElement("p"); 
    author.textContent = "Author: " + book.author;

    const year = document.createElement("p");
    year.textContent = "Year: " + book.year;

    const moveButton = document.createElement("button");
    moveButton.textContent = book.isComplete
      ? "Move to Belum Selesai Baca"
      : "Move to Selesai Baca";
    moveButton.style.backgroundColor = "green";
    moveButton.style.color = "white";
    moveButton.style.padding = "8px 12px";
    moveButton.style.marginLeft = "10px";
    moveButton.style.borderRadius = "10px";
    moveButton.style.border = "none";

    moveButton.onclick = () =>
      handleMoveBook(book.id, book.isComplete ? "belumselesai" : "isComplete");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.padding = "8px 12px";
    deleteButton.style.marginLeft = "5px";
    deleteButton.style.borderRadius = "10px";
    deleteButton.style.border = "none";

    deleteButton.onclick = () => handleDeleteBook(book.id);
    card.appendChild(title);
    card.appendChild(author); 
    card.appendChild(year);
    card.appendChild(moveButton);
    card.appendChild(deleteButton);

    belumSelesaiList.appendChild(card);

    if (book.isComplete) {
      selesaiList.appendChild(card);
    } else {
      belumSelesaiList.appendChild(card);
    }
  });
}

function init() {
  const storedBooks = localStorage.getItem(storageKey);
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    renderBooks();
  }
}

init();
