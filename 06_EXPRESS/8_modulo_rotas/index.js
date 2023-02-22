const express = require("express")
const path = require("path")

const  app = express()
const port = 3000

const users = require('./users')

const basePath = path.join(__dirname, 'templates')

// ler o body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json)

var checkAuth = function (req, res, next) {

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


app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)
    
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
    console.log(`${basePath}/index.html`)
})