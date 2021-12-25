import express from "express";
import data from "./data/data.json";

const app = express();
const PORT = 3000;

// for public folder - to serve static files in it on path /
app.use(express.static("public"));

// for images folder - to serve static files in it on path /images
app.use("/images", express.static("images"));

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
    const user = Number(req.params.id) - 1;
    res.send(data[user]);
    next();
}, (req, res) => console.log("did you get the right data?"));

app.post("/newItem", (req, res) => {
    res.send(`a post request with route /newItem on port ${PORT}`);
});

app.put("/item", (req, res) => {
    res.send(`a put request with route /item on port ${PORT}`);
});

app.delete("/item", (req, res) => {
    res.send(`a delete request with route /item on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
    console.log(data);
});