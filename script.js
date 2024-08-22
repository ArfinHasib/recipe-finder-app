const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const mealResultTitle = document.querySelector(".meal-result .title");

// Get meal list that matches with the ingredients
function getMealList() {
    let searchInputText = document.getElementById("search-input").value.trim();

    fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
    )
        .then((response) => response.json())
        .then((data) => {
            let html = "";

            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
                         <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Ge a Recipe</a>
                        </div>
                    </div>
                    `;
                });
                mealList.classList.remove("notFound");
            } else {
                html = "Sorry, We didn't find any meal!";
                mealList.classList.add("notFound");
            }
            mealList.innerHTML = html;
        });
    mealResultTitle.style.visibility = "visible";
}

// Get the recipe for the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
        )
            .then((response) => response.json())
            .then((data) => mealRecipeModal(data.meals));
    }
}

// Create and Show a Modal for the recipe details
function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `
            <h2 class="recipe-title">${meal.strMeal}</h2>
                <p class="recipe-category">${meal.strCategory}</p>
                <div class="recipe-instruct">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                </div>

                <div class="recipe-meal-img">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>

                <div class="recipe-link">
                    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe");
}

// Evetn Listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
});
