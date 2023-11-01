const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { validateSignUp, validateSignIn } = require("../utils/formValidator");
const User = require("../model/user");
const AppError = require("../utils/AppError");
const tryCatch = require('../middleware/tryCatch')

module.exports.Register = asyncHandler( async (req, res, next) => {
  const { error, value } = validateSignUp(req.body);
  if (error) {
    return next(new AppError(error.message, 200));
  }

  const email = value.email;
  const findUser = await User.findOne({ email });
  if (findUser) {
    return next(new AppError("Account already registered", 200));
   
  }
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(value.password, salt);
  const newUser = new User({
    name: value.name,
    username: value.username,
    email: value.email,
    password: hashedPassword,
  });
  await newUser.save();
  res.json({
    status: "ok",
    success: true,
    message: "Account Created Successfully",
    newUser,
  });
  res.status(200);

});

module.exports.Login = asyncHandler(async (req, res, next) => {
  const { error, value } = validateSignIn(req.body);
  if (error) {
    return next(new AppError(error.message, 201));
  }
  const username = value.username;
  const findUser = await User.findOne({ username });
  if (!findUser) {
    return next(new AppError("User does not exist", 201));
  }
  const isPasswordValid = await bcrypt.compare(
    value.password,
    findUser.password
  );
  if (!isPasswordValid) {
    return next(new AppError("Invalid user details", 201)); 
  }

  const token = jwt.sign({ id: findUser._id }, process.env.JWT_String, {
    expiresIn: "2d",
  });
  // res.cookie("user_flixcart_Id", token,{maxAge:2*24*86400000, httpOnly:true, domain:'localhost', path:'/'});
  
  res
    .json({
      status: "ok",
      success: true,
      message: "Logged In Successfully",
      token,
    })
    .status(202);
});

module.exports.LogOut = asyncHandler(async (req, res) => {
  res.cookie("userId", "", {
    httpOnly: true,
    maxAge: 1,
  });
  res
    .status(200)
    .json({ success: "ok", error: false, message: "Logged Out Successfylly" });
});

module.exports.VerifyCookie = asyncHandler(async(req, res, next)=>{
  const {user_flixcart_Id} = req.body;
 
  if (user_flixcart_Id) { 
    jwt.verify(user_flixcart_Id, process.env.JWT_String, (err, userToken) => {
      if (err) {
        return next(new AppError('Invalid token', 201));
      } else {
        return res.status(202).json({ status:'ok', success: true});
      } 
    }); 
  } else {
   return  next(new AppError("Unknown User", 201));
  }
})


module.exports.fetchUsers = asyncHandler(async (req, res) => {
  const findUsers = await User.find();
  res.json({ findUsers });
});
