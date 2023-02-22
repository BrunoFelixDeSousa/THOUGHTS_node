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
    const auth = true
    resp.render('home', {user, auth})
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})


app.listen(3000, () => {
    console.log('app funcionou')
})