const express = require("express");
const handler = require("./handler");
const middleware = require("./middleware");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();

// Pasang JSON Parser middleware
app.use(express.json());
app.set("view engine","ejs");
// Router 
const PUBLIC_DIRECTORY = path.join(__dirname,"public");

app.use(express.urlencoded({extended:true}));
app.use(express.static(PUBLIC_DIRECTORY));

app.post("/cars/create", handler.handleCreateCar);
app.get("/", handler.handleListCars);

app.get("/cars/:id/update",handler.handleUpdateCarForm);
app.post("/cars/:id/update",handler.handleUpdateCar);
app.get("/cars/:id", middleware.setCar, handler.handleGetCar);

app.put("/cars/:id", middleware.setCar, handler.handleUpdateCar);
app.delete("/cars/:id", middleware.setCar, handler.handleDeleteCar);
app.get("/create",(req,res)=>{
    res.render("create");
});
app.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));
