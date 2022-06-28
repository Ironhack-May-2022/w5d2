const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')

/* GET home page */
router.get("/signup", (req, res, next) => {
	res.render("signup");
});

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body
	console.log(username, password)
	// validation
	if (password.length < 4) {
		res.render('signup', { message: 'Password has to be 4 chars min' })
		return
	}
	// check if username is not empty
	if (username === '') {
		res.render('signup', { message: 'Username cannot be empty' })
		return
	}
	// validation passed
	// check if that username already exists 
	User.findOne({ username: username })
		.then(userFromDB => {
			// if there is a user
			if (userFromDB !== null) {
				res.render('signup', { message: 'Your username is already taken' })
				return
			} else {
				// we can use that username
				// we hash the password 
				const salt = bcrypt.genSaltSync()
				const hash = bcrypt.hashSync(password, salt)
				console.log(hash)
				// create the user
				User.create({ username: username, password: hash })
					.then(createdUser => {
						console.log(createdUser)
						res.redirect('/')
					})
					.catch(err => {
						next(err)
					})
			}
		})
});


module.exports = router;