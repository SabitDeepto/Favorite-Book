class Book{
	constructor(title,author,isbn){
		this.title = title
		this.author = author
		this.isbn = isbn 
	}
}

class UI {
	addBookToList(book){
		const list = document.getElementById('book-list')
		const row = document.createElement('tr')
		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td> <a href = "#" class="delete">X</a> </td> `
			list.appendChild(row)

	}

	showAlert(message,className){
		const div = document.createElement('div')
		div.className = `alert ${className}`
		div.appendChild(document.createTextNode(message))
		const container = document.querySelector('.container')
		const form = document.querySelector('#book-form')
		container.insertBefore(div,form)
		
		setTimeout(function(){document.querySelector('.alert').remove()} ,2000)

	}

	deleteBook(target){
		if (target.className === 'delete'){
			target.parentElement.parentElement.remove()
		}

	}

	clearFields(){
		document.getElementById('title').value = ''
		document.getElementById('author').value = ''
		document.getElementById('isbn').value = ''

	}
}

//EventListener
document.getElementById('book-form').addEventListener('submit',function(e){
	e.preventDefault()
	const title = document.getElementById('title').value
		  author = document.getElementById('author').value
		  isbn = document.getElementById('isbn').value

	//instantiate book
	const book = new Book(title,author,isbn)

	//instantiate UI
	const ui = new UI()

	//Validate
	if (title==='' || author === '' || isbn === ''){
		ui.showAlert('please fill all the fields', 'error')

	}else{
		ui.addBookToList(book)
		ui.showAlert('Book Added!', 'success')

		//clear Fields
		ui.clearFields()
	}
		
})

document.getElementById('book-list').addEventListener('click', function(e){
	const ui = new UI()
	ui.deleteBook(e.target)
	ui.showAlert('Book Removed!', 'success')
	e.preventDefault()
})

