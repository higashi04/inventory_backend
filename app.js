const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");


///add routes here
const userRoutes = require("./Routes/user");
///routes end

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error())
        }
    },
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_SERVER,
    touchAfter: 24 * 3600,
    crypto: {
        secret: process.env.SECRET,
    },
});

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

store.on("error", (e) => {
    console.log(e);
});

mongoose.connect(process.env.MONGO_SERVER, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
    console.log("mongo atlas is on");
});
mongoose.connection.on("error", (err) => {
    console.error("mongo encountered the following error: \n", err);
});

app.use(cookieParser(process.env.SECRET));
//add app.use routes here
app.use("/user", userRoutes);
// end of routes

const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
    res.send("backend app working");
    console.log("backend app working on port ", port)
});

app.listen(port, () => {console.log(`app running in port ${port}`)});