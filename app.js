const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());

// const recipeRoutes = require("./recipe.route");
const recipes = [
    {
        id: 101,
        recpname: "chicken briyani",
        foodType: "non-veg",
        ingredients: "hi",
        stepstoPrepare: "hello",
    },
    {
        id: 100,
        recpname: "Pasta",
        foodType: "veg",
        ingredients: "hi",
        stepstoPrepare: "hello",
    },
];
//get all recipes
app.get(["/recipes", "/"], (req, res) => {
    res.send(recipes);
});

app.get("/recipes/:id", (req, res) => {
    //console.log(req.params.id);
    // console.log("hiiiiiiii````````````");
    const recipe = recipes.find((r) => r.id == req.params.id);
    if (!recipe) {
        return res.status(404).json({
            message: `${req.params.id} not found`,
        });
    }
    res.send(recipe);
});

app.post("/recipes", (req, res) => {
    const payload = req.body;
    if (!payload.name) {
        return res.status(404).send({ message: "Recipe should have a name" });
    }
    payload.id = new Date().getTime();
    recipes.push(payload);
    return res.status(201).send(payload);
});

app.delete("/recipes/:id", (req, res) => {
    const index = recipes.findIndex((recipe) => recipe.id == req.params.id);
    if (index == -1) {
        return res.status(404).json({
            message: `${req.params.id} recipe not found`,
        });
    }
    const deletedRecipe = recipes[index];
    recipes.splice(index, 1);
    res.send(deletedRecipe);
});


app.put("/recipes/:id", (req, res) => {
    const payload = req.body;
    console.log("hello enjoy" + JSON.stringify(payload));

    if (!payload.recpname) {
        console.log("hi");
        return res.status(404).send(
            { message: "recipe should have a name" });
    }

    const index = recipes.findIndex((recipe) => recipe.id == req.params.id);
    console.log("hello" + index);
    if (index == -1) {
        return res.status(404).json({
            message: `${req.params.id} recipe not found`,
        });
    }
    console.log("hello enjoy");
    recipes[index]["id"] = payload.id;
    recipes[index]["recpname"] = payload.recpname;
    recipes[index]["foodType"] = payload.foodType;
    recipes[index]["ingredients"] = payload.ingredients;
    recipes[index]["stepstoPrepare"] = payload.stepstoPrepare;

    console.log("hello enjoy" + payload.recpname);
    return res.send(recipes[index]);
});

app.use((req, res, next) => {
    return res.status(404).json({
        message: "Resource not found",
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        console.log(`cannot running on ${port}`);
        process.exit(1);
    }

    console.log(`server running on ${port}`);
}); 