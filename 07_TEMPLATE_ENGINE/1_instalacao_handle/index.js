import express from 'express'
import { create } from 'express-handlebars'

const app = express()
const hbs = create({})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get("/", (req, resp) => {
    resp.render('home', {layout: false})
})


app.listen(3000, () => {
    console.log('app funcionou')
})