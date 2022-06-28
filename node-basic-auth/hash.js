const bcrypt = require('bcryptjs')

// $2a$10$YY8u62ht26cwc0Fs3Q5sAuttaOPELZ7nkjx1YUj7F/6rQt9X3KviK
// $2a$10$YY8u62ht26cwc0Fs3Q5sAuttaOPELZ7nkjx1YUj7F/6rQt9X3KviK
// $2a$10$YY8u62ht26cwc0Fs3Q5sAubiElYqLpqfX2B8QjczAqmlKQFT/v4oO
const password = '123457'
const salt = '$2a$10$YY8u62ht26cwc0Fs3Q5sAu'
console.log('salt: ', salt.length)

const hash = bcrypt.hashSync(password, salt)
console.log('hash: ', hash)