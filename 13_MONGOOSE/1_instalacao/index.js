const express = require('express')
const { create } = require('express-handlebars')

const app = express()

const conn = require('./db/conn').run

const ProductController = require('./controllers/ProductController')

const ProductRoutes = require('./routes/ProdutcsRoutes')

// Configurar o Handlebars como mecanismo de visualização, especificando um diretório de partials
const handlebars = create( {partialsDir:['views/partials']})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))


// Habilitar o parsing de requisições JSON e de formulários
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', ProductRoutes)


app.listen(3000)

