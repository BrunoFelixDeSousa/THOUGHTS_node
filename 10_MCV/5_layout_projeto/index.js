const express =require('express')
const { create } = require('express-handlebars')

const app = express()
const conn = require('./db/conn')

const Task = require('./models/Task')

const taskRoutes = require('./routes/taskRoutes')

const hbs = create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(express.json())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use('/tasks', taskRoutes)

conn.sync().then(() => {
    app.listen(3000)
}).catch((err) => console.log(err))