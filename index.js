
const cors = require('cors');
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000





app.get('/', (req, res) => {
  res.send('My server is running!')
})

app.listen(port, () => {
  console.log(`My app listening on port ${port}`)
})