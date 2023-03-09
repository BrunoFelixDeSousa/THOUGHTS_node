const Task = require('../models/Task')

module.exports = class TaskController {
   
    // GET '/add'
    // me direciona para pagina create, para criar uma tarefa
    static createTask(req, res) {
        res.render('tasks/create')
    }

    // POST '/add'
    // na pagina create eu salvo os dados no banco
    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        // função create do sequelize para salvar os dados no banco
        await Task.create(task)
            .then( res.redirect('/tasks'))
            .catch((err) => console.log())
    }

    // GET '/'
    // mostrar todas as terafas na tela, na página '/tasks'
    static async showTasks(req, res) {

        const tasks = await Task.findAll({raw: true})
        res.render('tasks/all', {tasks})
    }

    // POST '/remove' 
    // para enviar uma requisição e deletar do banco
    static async removeTask(req, res) {
        const id = req.body.id
        
        // metodo destroy do sequelize
        await Task.destroy({
            where: {
                id: id
            }
        }).then(res.redirect('/tasks')).catch((err) => console.log(err))
    }

    // GET '/edit/:id'
    // capturar id e pesquisar no banco para atualização
    static async updateTask(req, res) {
        
        const id = req.params.id

        const task = await Task.findOne({ where: { id: id }, raw: true })
        res.render('tasks/edit', {task})
    }

    // POST '/edit'
    // atualiza os dados no banco e redireciona para pagia all
    static async updateTaskPost(req, res) {
        const id = req.body.id

        const task = {
            title: req.body.title,
            description: req.body.description
        }
        
        // metodo update do sequelize
        await Task.update(task, {where: {id: id} })
        res.redirect('/tasks')
    }

    // POST '/updateStatus' para atualizar status da tarefa
    static async toggleTaskStatus(req, res) {
        const id = req.body.id

        const task = {
            done: req.body.done === '0' ? true : false
        }

        await Task.update(task, { where: {id : id} })
        res.redirect('/tasks')
    }

    static async task(req, res) {

        const task = await Task.findOne( {where: { id: req.params.id}, raw: true} )
        res.render('tasks/task', {task})
    }

}