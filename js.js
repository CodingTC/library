


console.log("hello world");

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

    this.displayInfo = () => `${title} by ${author}, ${numPages} pages, ${isRead ? "has been read" : "not read yet"}`;
}


let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(theHobbit.displayInfo());

console.log(Book.prototype) ;


