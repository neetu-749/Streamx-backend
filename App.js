const express = require("express");
const morgan = require("morgan");
const app = express();
const auth = require("./router/signUp");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://ghoon:ghoon@cluster0.6e7csob.mongodb.net/video_api?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
    .connect(MONGO_URL,)
    .then(() => console.log("DBconnection successful"))
    .catch((err) => {
        console.log(err);
    });



app.use(cors());   // cross origin resource sharing errors
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use("/api/auth",auth);
app.use("/api/signIn",require('./router/signIn'));



app.listen("5000",()=>{
    console.log("Running at port 5000");
});

