const express = require("express")
const path = require("path")

const  app = express()
const port = 3000


// ler o body
app.use(
    express.urlencoded({
        extended: true
    })
)

const checkAuth = function (req, res, next) {

    req.authStatus = true

    if (req.authStatus) {
        console.log('Está logado, pode continuar')
        next()
    } else {
        console.log('Não está logado, faça o login para continar')
        next()
    }
}

app.use(checkAuth)
const basePath = path.join(__dirname, 'templates')

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})
 
app.post('/users/save', (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const age = req.body.age

    console.log(name)
    console.log(age)
    res.sendFile(`${basePath}/userform.html`)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    console.log(`Estamos buscando pelo usuário: ${id}`)
    
    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)
    
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})