const router = require("express").Router();
// we need to require the Book model to communicate with the db
const Book = require('../models/Book')
// when we use populate we also need to import the model
const Author = require('../models/Author')


router.get('/books', (req, res, next) => {
	// console.log('books')
	// get all the books from the db
	Book.find()
		.then(booksFromDB => {
			console.log(booksFromDB)
			// render a view named 'books' with all the books from the db 
			res.render('books', { bookList: booksFromDB })
		})
		.catch(err => {
			next(err)
		})
})

router.get('/books/add', (req, res, next) => {
	// get all the authors from the db
	Author.find()
		.then(authorsFromDB => {
			console.log(authorsFromDB)
			res.render('add', { authors: authorsFromDB })
		})
		.catch(err => next(err))
});

router.get('/books/:id', (req, res, next) => {
	console.log(req.params)
	console.log(req.params.id)
	const bookId = req.params.id
	Book.findById(bookId)
		// this line is used to replace the _id of the author with the full object
		.populate('author')
		.then(bookFromDB => {
			console.log(bookFromDB)
			res.render('bookDetails', { book: bookFromDB })
		})
		.catch(err => {
			next(err)
		})
});

router.post('/books', (req, res, next) => {
	// retrieve the values from the input fields
	// this would be the long version
	// const title = req.body.title
	// using object destructuring
	const { title, description, author, rating } = req.body
	// create the book document in the db
	Book.create({
		title: title,
		description: description,
		author: author,
		rating: rating
	})
		.then(createdBook => {
			console.log(createdBook)
			// show the detail view with the created book
			// res.render('bookDetails', { book: createdBook })
			// redirect to the detail view of this book - this always get's the 
			// current instance of the book
			res.redirect(`/books/${createdBook._id}`)
		})
		.catch(err => {
			next(err)
		})
});

router.get('/books/edit/:id', (req, res, next) => {
	const bookId = req.params.id
	// retrieve this book from the db
	Book.findById(bookId)
		.then(bookFromDB => {
			console.log(bookFromDB)
			res.render('edit', { book: bookFromDB })
		})
		.catch(err => {
			next(err)
		})
});

router.post('/books/edit/:id', (req, res, next) => {
	const bookId = req.params.id
	const { title, description, author, rating } = req.body
	// this is using the object shorthand in the 2nd parameter
	Book.findByIdAndUpdate(bookId, { title, description, author, rating })
		.then(() => {
			res.redirect(`/books/${bookId}`)
		})
		.catch(err => {
			next(er)
		})
});

router.get('/books/delete/:id', (req, res, next) => {
	const bookId = req.params.id
	// delete this book in the db	
	Book.findByIdAndDelete(bookId)
		.then(deletedBook => {
			console.log(deletedBook)
			res.redirect('/books')
		})
		.catch(err => {
			next(err)
		})
});

// add a review
router.post('/books/:id/reviews', (req, res, next) => {
	const bookId = req.params.id
	const { text, user } = req.body
	// we need to add an {} with text and user to the reviews array
	// we need to add {new: true} if udpatedBook should be the updated obj
	Book.findByIdAndUpdate(bookId, { $push: { reviews: { user: user, text: text } } }, { new: true })
		.then(updatedBook => {
			console.log(updatedBook)
			res.redirect(`/books/${bookId}`)
		})
		.catch(err => next(err))

});


module.exports = router;