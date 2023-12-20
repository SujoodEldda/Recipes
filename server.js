const express = require('express')
const path = require('path')
const recipesAPI = require('./server/routes/recipes_API')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', recipesAPI)


const port = 1544 
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})