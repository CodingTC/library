let myLibrary = [];

class Book
{
    constructor(title, author, numPages, isRead)
    {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
        this.id = crypto.randomUUID();
    }
    
    toggleIsRead()
    {
        return this.isRead = !this.isRead;
    }
}


function addBookToLibrary(title, author, numPages, isRead)
{
    let newBook = new Book(title, author, numPages, isRead);
    myLibrary.push(newBook);
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("IT", "Stephen King", 1045, true);

const libraryTable = document.querySelector(".my-library-body");

//code right here sucks could rework
function displayLibrary(theLibrary)
{
    for(const book of theLibrary)
    {
        let newRow = document.createElement("tr");
        for(const key in book)
        {
            if(book.hasOwnProperty(key) && typeof book[key] !== "function")
            {    
                let tCell = document.createElement("td");
                tCell.classList.add(`book-${key}`);
                tCell.textContent = book[key];
                newRow.appendChild(tCell);
            }

        }
           
        newRow.dataset.bookId = book.id;

        let delButton = document.createElement("button");
        delButton.textContent = "Delete";

        let toggleIsReadButton = document.createElement("button");
        toggleIsReadButton.textContent = "Toggle Is Read";  

        toggleIsReadButton.addEventListener("click", () => {
            let objToToggle = myLibrary.filter(b => b.id === book.id)
            let selectedRow = document.querySelector(`[data-book-id='${objToToggle[0].id}']`);
            let isRead = selectedRow.querySelector(".book-isRead")
            isRead.textContent = objToToggle[0].toggleIsRead();
        });
        
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
    //prevent modal from closing
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
