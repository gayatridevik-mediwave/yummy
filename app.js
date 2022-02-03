const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const db = require("./db");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.send("hi");
});

//get all recipes
app.get("/recipe", (req, res) => {
    const recipe = db.recipe;
    return res.send(recipe);
});

//get one recipe
app.get("/recipe/:id", (req, res) => {
    const recipeid = req.params.id;
    const getOneRecipe = db.getOneRecipe(recipeid);
    if (!getOneRecipe) {
        return res.status(404).send({
            message: `recipe ${recipeid} not found`,
        });
    }
    return res.send(getOneRecipe);
});

//add a recipe
app.post("/recipe", (req, res) => {
    const recipe = db.addRecipe(req.body);
    return res.send(recipe);
})

//delete a movie
app.delete("/recipe/:id", (req, res) => {
    const deleteId = req.params.id;
    console.log(deleteId);
    db.deleteRecipe(deleteId);
    return res.send({
        message: "Recipe deleted",
    });
});

//update a movie
app.put("/recipe/:id", (req, res) => {
    const updateId = req.params.id;
    const payload = req.body;
    const recipe = db.updateRecipe(updateId, payload);
    return res.send(recipe);
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        console.log(`cannot running on ${port}`);
        process.exit(1);
    }

    console.log(`server running on ${port}`);
});