import express from 'express'
import { create } from 'express-handlebars'

const app = express()
const hbs = create({})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, resp) => {

    const user = {
        name: "Bruno",
        lastname: "Felix"
    }

    resp.render('home', {user})
})


app.listen(3000, () => {
    console.log('app funcionou')
})