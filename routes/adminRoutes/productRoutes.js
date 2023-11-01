const { AddProduct, GetAllProducts, getHomeProducts, getProductsInfo, aDummy } = require('../../controllers/product');
const { requireAuth } = require('../../middleware/verifyToken');
const authLimiter = require('../../middleware/authLimiter');
const router = require("express").Router();

router.post("/add-product", authLimiter, requireAuth, AddProduct);
router.get("/get-product", GetAllProducts);
router.get('/get-product/:id', getProductsInfo)
router.get('/home-product', getHomeProducts)
router.get('/dummy', aDummy)


module.exports = router 
