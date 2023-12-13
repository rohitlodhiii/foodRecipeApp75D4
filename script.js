const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');
console.log('hello')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7d9e0157&app_key=15658b80efcd02b0118f394404df7746&from=0&to=10`);
    const data = await response.json();
    displayRecipes(data.hits);
    console.log(data)
}

function displayRecipes(recipes) {
    var count = 45 ;
   
    let html = '';
    recipes.forEach((recipe) => {
        var sting  = recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('');
        
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3 class="fw-bolder">${recipe.recipe.label}</h3>
            <h6 class="mt-1"> Ingredients Used</h6>
            <ul class="fw-light" >
                ${sting}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `
    })
    resultsList.innerHTML = html;
}

