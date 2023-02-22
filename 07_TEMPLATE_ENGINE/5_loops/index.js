import express from 'express'
import { create } from 'express-handlebars'

const app = express()
const hbs = create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, resp) => {

    const user = {
        name: "Bruno",
        lastname: "Felix"
    }

    resp.render('home', {user: user, auth: true})
})

app.get('/dashboard', (req, res) => {

    const items = ["Item A", "Item B", "Item C"]

    res.render('dashboard', {items: items})
})

app.get('/post', (req, res) => {

    const post = {
        title: "Aprender Node.js",
        category: "Node.js",
        body: "Node.js é muito utilizado na programação hoje em dia",
        comments: 4
    }
    res.render("blogpost", { post })
})

app.get("/blog", function (req, res) {
    const posts = [
      {
        title: "Aprender Node.js",
        category: "Node.js",
        body: "Node.js é muito utilizado na programação hoje em dia",
        comments: 4,
      },
      {
        title: "PHP ainda vale a pena?",
        category: "PHP",
        body: "",
        comments: 12,
      },
      {
        title: "Os segredos de JavaScript",
        category: "JavaScript",
        body: "",
        comments: 5,
      },
    ];
  
    res.render("blog", { posts });
  });

app.listen(3000, () => {
    console.log('app funcionou')
})