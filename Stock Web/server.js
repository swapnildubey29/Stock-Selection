const express = require('express')
const app = express()
const path = require('path')


//Setting static folder
app.use(express.static('public'))



app.listen(8000)