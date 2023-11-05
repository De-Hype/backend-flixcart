const asyncHandler = require("express-async-handler");
const { validateAddProductToDb } = require("../utils/formValidator");
const Products = require("../model/item");
const AppError = require("../utils/AppError");

module.exports.AddProduct = asyncHandler(async (req, res, next) => {
  const { error, value } = validateAddProductToDb(req.body);
  if (error) {
    console.log(error.message);
    next(new AppError(error.message, 401));
  }
  const newProduct = new Products({
    name: value.name,
    imageUrl: value.imageUrl,
    description: value.description,
    discount_percent: value.discount_percent,
    new_price: value.new_price,
    old_price: value.old_price,
    ratings: value.ratings,
  });
  await newProduct.save();

  res.json({
    success: true,
    message: `${newProduct.name} Added Successfully`,
    newProduct,
  });
  res.status(202);
});

module.exports.GetAllProducts = asyncHandler(async (req, res) => {
  const getProduct = await Products.find();
  res.json(getProduct);
});

module.exports.getHomeProducts = asyncHandler(async (req, res) => {
  const home_limit = 4;
  const getProduct = await Products.find().limit(home_limit);
  res.json(getProduct);
});

module.exports.getProductsInfo = asyncHandler(async (req, res, next) => {
  const getProductInfo = await Products.findOneById(req.body.id);
  if (!getProductInfo) {
    next(new AppError("Item by that Id not found", 401));
  }
  console.log(getProductInfo);
});

// const Cartstuff = [{
//   id:1,
//   "name":"David",
// },
// {
//   id:2,
//   "name":"Hype",
// }
// ]
// const findP = Cartstuff.includes('David')
// console.log(findP)
module.exports.SearchResults = asyncHandler(async (req, res, next)=>{
  const {searchTerm} = req.body;


  const findProducts = await Products.find({name:{$regex:searchTerm, $options:"i"}})
  // const 
})

module.exports.aDummy = asyncHandler(async (req, res, next) => {
  //
  next(new AppError("An Error Occured on product", 400));
  console.log("A Dummy");
});
