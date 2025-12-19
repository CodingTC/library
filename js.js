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

console.log(theHobbit.displayInfo());


