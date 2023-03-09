const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TakController') 

router.get('/', TaskController.showTasks)
router.get('/add', TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.post('/remove', TaskController.removeTask)
router.get('/edit/:id', TaskController.updateTask)
router.post('/edit', TaskController.updateTaskPost)
router.post('/updateStatus', TaskController.toggleTaskStatus)
router.get('/task/:id', TaskController.task)

module.exports = router