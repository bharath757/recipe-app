import { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes?limit=110&skip=0');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="recipes-container">
      <h1>Recipe List</h1>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <div className="recipe-content">
              <h2>{recipe.name}</h2>
              <p>Cuisine: {recipe.cuisine}</p>
              <p>Difficulty: {recipe.difficulty}</p>
              <p>Servings: {recipe.servings}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
