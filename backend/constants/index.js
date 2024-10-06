
// BEST PRACTICE TO KEEP CREDENTIALS LIKE SECRET KEY IN .ENV FILE. But for the time being keeping in the below variables only
module.exports = {
SECRET_KEY: process.env.SECRET_KEY||"12345678901"
}