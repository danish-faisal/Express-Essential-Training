import express from "express";
import favicon from "serve-favicon";
import path from "path";
import data from "./data/data.json";

const app = express();
const PORT = 3000;

// method to use JSON
// app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// for public folder - to serve static files in it on path /
app.use(express.static("public"));

// for images folder - to serve static files in it on path /images
app.use("/images", express.static("images"));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.get("/", (req, res) => {
    // res.send(`a get request with route / on port ${PORT}`);
    // get data from the db first
    res.json(data);
});

app.get("/images", (req, res) => {
    res.download("./images/rocket.jpg");
    // res.redirect("https://www.linkedin.com")
    // res.end();
    // res.send(`a get request with route /images on port ${PORT}`);
});

app.get("/item/:id", (req, res, next) => {
    // this is middleware that pulls the data
    console.group(req.params.id);
    const user = Number(req.params.id) - 1;
    console.log(data[user]);
    // middleware that uses req object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    // everything above this is middleware
    res.send(data[user]);
    next();
}, (req, res) => console.log("did you get the right data?"));

app.post("/newItem", (req, res) => {
    console.log(req.body);
    res.send(req.body);
    // res.send(`a post request with route /newItem on port ${PORT}`);
});

// Routing Chaining
app.route("/item")
    .get((req, res) => {
        throw new Error();
        res.send(`a get request with route /item on port ${PORT}`);
    })
    .put((req, res) => {
        res.send(`a put request with route /item on port ${PORT}`);
    }).delete((req, res) => {
        res.send(`a delete request with route /item on port ${PORT}`);
    });

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(`Red Alert! Red Alert!: ${err.stack}`);
});

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
    console.log(data);
});