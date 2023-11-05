const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const sessions = require("express-session");
const { Connect } = require("./utils/db");
const AuthenticationRoutes = require("./routes/Authentication");
const ProductRoutes = require("./routes/adminRoutes/productRoutes");
const GlobalErrorHandler = require("./controllers/errorController");
const GlobalHandler = require("./utils/errorHandler");

const app = express();
app.use(
  cors()
);

// app.use(cookieParser());
app.use(helmet());
app.use(express.json());

app.use("/api", AuthenticationRoutes);
app.use("/api/admin/product", ProductRoutes);
app.use(GlobalErrorHandler);

const Port = process.env.PORT || 8080;


Connect().then(() => {
    app.listen(Port, () => {
        console.log(`Listening for requests on ${Port}`);
    })
})


// app.listen(Port, () => {
//   console.log(`Server runing on port ${Port}`);
// });
