const myLibrary = [];

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

function displayLibrary()
{
    for(const book of myLibrary)
    {
        let newRow = document.createElement("tr");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let numPages = document.createElement("td");
        let isRead = document.createElement("td");
        let id = document.createElement("td");
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
        libraryTable.appendChild(newRow);
    }
}

displayLibrary();
