import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);

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

  const toggleExpand = (id) => {
    setExpandedRecipeId(expandedRecipeId === id ? null : id);
  };

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="recipes-container">
      <h1>Recipe World</h1>
      <div className="recipe-grid">
        {recipes.map((recipe) => {
          const isExpanded = expandedRecipeId === recipe.id;

          return (
            <div
              key={recipe.id}
              className={`recipe-card ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleExpand(recipe.id)}
            >
              {isExpanded ? (
                <>
                  <div className="expanded-content">
                    <img src={recipe.image} alt={recipe.name} className="expanded-image" />
                    <div className="expanded-details-text">
                      <h2>{recipe.name}</h2>
                      <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
                      <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
                      <p><strong>Servings:</strong> {recipe.servings}</p>
                      <h4>Instructions:</h4>
                      <ol>
                        {recipe.instructions.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                  <div className="recipe-content">
                    <h2>{recipe.name}</h2>
                    <p>Cuisine: {recipe.cuisine}</p>
                    <p>Difficulty: {recipe.difficulty}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
