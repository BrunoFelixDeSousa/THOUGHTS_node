const express =require('express')
const { create } = require('express-handlebars')

const app = express()
const conn = require('./db/conn')

const hbs = create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(
    express.json(),
    express.urlencoded({
        extended: true
    })
)

app.listen(3000)