const recipe = [
    {
        id: 101,
        recpname: "chicken briyani",
        foodType: "non-veg",
        ingredients: "hi",
        stepstoPrepare: "hello",
        images: {
            url: "./images/",
            altInfo: "Biriyani Images",
        },
    },
    {
        id: 100,
        recpname: "Pasta",
        foodType: "veg",
        ingredients: "hi",
        stepstoPrepare: "hello",
        images: {
            url: "./images/",
            altInfo: "pasta Images",
        },
    },
    {
        id: 102,
        recpname: "Vegtable Soup",
        foodType: "veg",
        ingredients: "hi",
        stepstoPrepare: "hello",
        images: {
            url: "./images/",
            altInfo: "soup Images",
        },
    }
];

const getOneRecipe = (recipeid) => {
    const getOneRecipe = recipe.find((m) =>
        m.id == recipeid);
    return getOneRecipe;
};

const addRecipe = (payload) => {
    const recipea = {
        id: new Date().getTime(),
        ...payload,
    };
    recipe.push(recipea);
    return recipea;
};

const deleteRecipe = (deleteId) => {
    const deletedIndex = recipe.findIndex((m) => m.id == deleteId);
    if (deletedIndex == -1) {
        console.log("movie not found");
    }
    recipe.splice(deletedIndex, 1);
}

const updateRecipe = (updateId, payload) => {
    const updateIndex = recipe.findIndex((m) => m.id == updateId);
    if (updateIndex == -1) {
        console.log("recipe not found");
    } recipe[updateIndex]["recpname"] = payload.recpname;

    return recipe[updateIndex];
    // movies[index]["name"] = payload.name;
}

module.exports = {
    recipe,
    getOneRecipe,
    addRecipe,
    deleteRecipe,
    updateRecipe,
}