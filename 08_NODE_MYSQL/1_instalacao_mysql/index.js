import express from 'express'
import { create } from 'express-handlebars'
import mysql from 'mysql2'

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const hbs = create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

// INSERINDO DADOS NO BANCO
app.post('/books/insertbook', (req, res) => {
    
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) VALUES('${title}', '${pageqty}')`

    conn.query(sql, (err) => {
        console.log(err)
    })

    res.redirect('/')
})

// RECUPERANDO TODOS OS DADOS DO BANCO
app.get('/books', (req, res) => {
    
    const sql = "SELECT * FROM books"

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const books = data

        //console.log(books)

        res.render('books', { books })
    })

})

// RECUPERANDO DADO POR ID DO BANCO
app.get('/books/:id', (req, res) => {
    
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id='${id}'`

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', { book })
    })

})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql'
})

conn.connect((err) => {
    
    if (err) {
        console.log(err)
    }

    console.log('conectou ao mysql')
    app.listen(3000, () => {
        console.log('servidor rodando na porta 3000')
    })
    
})