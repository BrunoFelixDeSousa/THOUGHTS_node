const express = require('express')
const router = express()

const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.showProducts)
router.get("/create", ProductController.createProduct)
router.post("/create", ProductController.createProductPost)
router.get("/:id", ProductController.getProduct)
router.get('/delete/:id', ProductController.deleteProduct)
router.get('/edit/:id', ProductController.editProduct)
router.post('/edit', ProductController.editProductPost)


module.exports = router