import express from 'express'
import { create } from 'express-handlebars'

const app = express()

const hbs = create({
    partialsDir: ['views/partials']
})

//const conn = require('./db/conn')

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
  
  app.listen(3000, () => {
      console.log('app rodandando')
  })