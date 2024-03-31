console.log("express project");

const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const contactsHandler = require("./routes/contactRoutes");
const userHandler = require("./routes/usersHandler");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleWare/errorHandler");

connectDb()
 
const app = express();

app.use(express.json());

app.use("/api/contacts", contactsHandler);
app.use("/api/users", userHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
