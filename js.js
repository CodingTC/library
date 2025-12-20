let myLibrary = [];

function Book(title, author, numPages, isRead)
{
    if(!new.target)
    {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();

    this.displayInfo = () => `${title} by ${author}, ${numPages} pages, ${isRead ? "has been read" : "not read yet"}`;
}

Book.prototype.toggleIsRead = function() 
{
    return this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, numPages, isRead)
{
    let newBook = new Book(title, author, numPages, isRead);
    myLibrary.push(newBook);
}


let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("IT", "Stephen King", 1045, true);

console.log(theHobbit.displayInfo());

const libraryTable = document.querySelector(".my-library-body");

function displayLibrary(theLibrary)
{
    for(const book of theLibrary)
    {
        let newRow = document.createElement("tr");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let numPages = document.createElement("td");
        let isRead = document.createElement("td");
        let id = document.createElement("td");
           
        newRow.dataset.bookId = book.id;

        title.textContent = book.title;     
        newRow.appendChild(title);
        author.textContent = book.author;     
        newRow.appendChild(author);
        numPages.textContent = book.numPages;     
        newRow.appendChild(numPages);
        isRead.textContent = book.isRead;     
        newRow.appendChild(isRead);
        id.textContent = book.id;     
        newRow.appendChild(id);

        let delButton = document.createElement("button");
        let toggleIsReadButton = document.createElement("button");

        toggleIsReadButton.addEventListener("click", () => {
            let objToToggle = myLibrary.filter(b => b.id === book.id)
            isRead.textContent = objToToggle[0].toggleIsRead();

        });

        toggleIsReadButton.textContent = "Toggle Is Read";  

        delButton.textContent = "Delete";
        
        delButton.addEventListener("click", () => {
            myLibrary = myLibrary.filter(b => b.id !== book.id);
            newRow.remove();
        });

        newRow.appendChild(delButton);
        newRow.appendChild(toggleIsReadButton);

        libraryTable.appendChild(newRow);
    }
}



displayLibrary(myLibrary);

const newBookDialog = document.querySelector(".new-book-dialog");

const addBookButton = document.querySelector(".add-new-book");

addBookButton.addEventListener("click", () => newBookDialog.showModal());

const submitNewBookButton = document.querySelector(".bog");

submitNewBookButton.addEventListener("click", (e) => {
    e.preventDefault();

    let titleInput = document.getElementById("book-title");
    let authorInput = document.getElementById("book-author");
    let numPagesInput = document.getElementById("num-book-pages");
    let isReadInput = document.getElementById("book-is-read");

    addBookToLibrary(titleInput.value, authorInput.value,
        numPagesInput.value, isReadInput.checked);

    titleInput.value = "";
    authorInput.value = "";
    numPagesInput.value = "";
    isReadInput.checked = false;
    
    displayLibrary(myLibrary.slice(-1));
    
    newBookDialog.close();
});
