
// BEST PRACTICE TO KEEP CREDENTIALS LIKE DB_USER, PASSWORD IN .ENV FILE. But for the time being keeping in the below variables only
        const DB_USER=process.env.DB_USER || 'rammoyUser'
        const DB_PASSWORD=process.env.DB_PASSWORD || 'Rammoy123'


module.exports = {
    url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.3png5.mongodb.net/sample_db`
  };