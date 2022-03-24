const express = require('express')
const app = express()

// could be command line argument...
var port = 5000

app.listen(port, () => {
    console.log(`App running on port ${port}`)
  })