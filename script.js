document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = 'fd4fc10a5775478d959bd5e6a1ec45ff '; // Replace with your actual Spoonacular API key
  const recipes = document.getElementById('recipes');
  const searchInput = document.getElementById('search');
  const darkModeToggle = document.getElementById('dark');
  const lightModeToggle = document.getElementById('light');
  const body = document.body;

  const fetchRecipes = async (query = '') => {
      try {
          const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=10`);
          const data = await response.json();
          displayRecipes(data.results);
      } catch (error) {
          console.error('Error fetching recipes:', error);
      }
  };

  const displayRecipes = (recipes) => {
      recipesContainer.innerHTML = '';
      recipes.forEach(recipe => {
          const recipeElement = document.createElement('div');
          recipeElement.classList.add('recipe');
          recipeElement.innerHTML = `
              <img src="${recipe.image}" alt="${recipe.title}">
              <h3>${recipe.title}</h3>
              <a href="recipe.html?id=${recipe.id}"><button>View Recipe</button></a>
          `;
          recipesContainer.appendChild(recipeElement);
      });
  };

  searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      fetchRecipes(query);
  });

  darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      darkModeToggle.style.display = 'none';
      lightModeToggle.style.display = 'inline';
  });

  lightModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      lightModeToggle.style.display = 'none';
      darkModeToggle.style.display = 'inline';
  });

  // Initial fetch to display some recipes
  fetchRecipes();
});
