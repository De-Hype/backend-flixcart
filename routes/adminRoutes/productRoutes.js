const { AddProduct, GetAllProducts, getHomeProducts, getProductsInfo, SearchResults } = require('../../controllers/product');
const { requireAuth } = require('../../middleware/verifyToken');
const authLimiter = require('../../middleware/authLimiter');
const router = require("express").Router();

router.post("/add-product", authLimiter, requireAuth, AddProduct);
router.get("/get-product", GetAllProducts);
router.get('/get-product/:id', getProductsInfo)
router.get('/home-product', getHomeProducts)
router.get('/search-product/:searchTerm', SearchResults) 


module.exports = router 
