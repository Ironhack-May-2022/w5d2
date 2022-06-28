const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
	title: {
		type: String,
		unique: true
	},
	description: String,
	author: {
		type: Schema.Types.ObjectId,
		// this refers to the model the id belongs to
		ref: 'Author'
	},
	reviews: [{
		user: String,
		text: String
	}],
	rating: Number
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
