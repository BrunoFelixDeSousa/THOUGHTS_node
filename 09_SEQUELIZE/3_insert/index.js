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
    async (req, res) => {
        User.findAll({raw: true})
            .then((users) => {
            console.log(users)
            res.render('home', {users: users})
        }).catch((err) => console.log(err))
    }
)

app.get(
    '/users/create', (req, res) => {
        res.render('adduser')
})

app.post(
    '/users/create',
    async (req, res) => {

        const name = req.body.name
        const occupation = req.body.occupation
        let newsletter = req.body.newsletter

        if (newsletter === 'on') {
            newsletter = true
        }

        await User.create({name, occupation, newsletter})
            .then(res.redirect('/'))
            .catch((err) => console.log(err))

    }
)

app.get(
    '/users/:id', (req, res) => {

        const id = req.params.id
        User.findOne({
            raw:true,
            where: {
                id: id
            }
        }).then((user) => {
            console.log(user)
            res.render('userview', {user})
        }).catch((err) => console.log(err))
    }
)

app.post(
    '/users/delete/:id',
    (req, res) => {
        const id = req.params.id

        User.destroy({
            where: {
                id: id
            }
        }).then((user) => {
            res.redirect('/')
        }).catch((err) => console.log(err))
    }
)

app.get(
    '/users/edit/:id', (req, res) => {
        const id = req.params.id

        User.findOne({
            raw: true,
            where: {
                id: id
            }
        }).then((user) => {
            console.log(user)
            res.render('useredit', { user })
        }).catch((err) => console.log(err))
    }
)

app.post(
    '/users/update',
    (req, res) => {
        const id = req.body.id
        const name = req.body.name
        const occupation = req.body.occupation
        let newsletters = req.body.newsletter

        if (newsletters === 'on') {
            newsletters = true
        } else {
            newsletters = false
        }

        const userData = {
            id,
            name,
            occupation,
            newsletter
        }

        console.log(req.body)
        console.log(userData)

        User.update(
            userData, {
                where: {
                    id: id
                }
            }
        ).then((user) => {
            console.log(user)
            res.redirect('/')
        }).catch((err) => console.log(err))

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