class Book{
	constructor(title,author,isbn){
		this.title = title
		this.author = author 
		this.isbn = isbn
	}
}

class UI{
	addBookToList(book){
		const list = document.getElementById('book-list')
		const row = document.createElement('tr')
		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class = "delete"> X </a> </td>`
		list.appendChild(row)
		

	}

	showAlert(message, className){
		const div = document.createElement('div')
		div.className = `alert ${className}`
		div.appendChild(document.createTextNode(message))
		const container = document.querySelector('.container')
		const form = document.getElementById('book-form')
		container.insertBefore(div,form)

		setTimeout(function(){document.querySelector('.alert').remove()}, 2000)

	}

	clearFields(){
		document.getElementById('title').value = ''
		document.getElementById('author').value = ''
		document.getElementById('isbn').value = ''

	}

	deleteBook(target){
		if(target.className==='delete'){
			target.parentElement.parentElement.remove()
		}
	}



}


//Local storage class
class Store{
	static getBooks(){
		let books;
		if(localStorage.getItem('books')=== null){
			books = []
		}else{
			books = JSON.parse(localStorage.getItem('books'))
		}
		return books 

	}

	static displayBooks(){
		const books = Store.getBooks()
		books.forEach(function(book){
			const ui = new UI()

			//Add book to UI
			ui.addBookToList(book)
		})

	}

	static addBook(book){
		const books = Store.getBooks()
		books.push(book)
		localStorage.setItem('books',JSON.stringify(books))

	}

	static removeBook(isbn){
		const books = Store.getBooks()
		books.forEach(function(book, index){
			if(book.isbn === isbn){
				books.splice(index, 1)
			}
		});
		localStorage.setItem('books',JSON.stringify(books))
	}

	
}


//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);


//Add event listener for submit
document.getElementById('book-form').addEventListener('submit', function(e){
	e.preventDefault()
	const title = document.getElementById('title').value
	const author = document.getElementById('author').value
	const isbn = document.getElementById('isbn').value

	//Instantiate Book
	const book = new Book(title,author,isbn)


	//Instantiate UI
	const ui = new UI();

	if(title==='' || author==='' || isbn===''){
		ui.showAlert('Please Fill All The Fields', 'error')
	}else{
		ui.addBookToList(book)

		//Add to local Storage
	    Store.addBook(book)
		ui.showAlert('Book Added !', 'success')
		ui.clearFields()
	}

})


// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
	const ui = new UI();
	ui.deleteBook(e.target)

	//Remove from Local Storage
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

	ui.showAlert('book is deleted!', 'success')
	e.preventDefault()
})
