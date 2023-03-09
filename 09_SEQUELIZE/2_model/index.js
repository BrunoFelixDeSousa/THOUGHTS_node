const express = require('express')
const { create } = require('express-handlebars')

const app = express()

const hbs = create({
    partialsDir: ['views/partials']
})

const conn = require('./db/conn')
const User = require('./models/User')

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(
    express.json()
)

app.get(
    '/',
    function (req, res) {
        res.render('home')
    }
)

/*
criar tabelas e rodar o app
 */
conn
    .sync()
    .then(() => {
        app.listen(3000,() => {
            console.log('app rodando!')
        })
    }).catch((err) => console.log(err))