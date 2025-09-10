import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  useEffect(() => {
    const getDishes = async () => {
      try {
        const res = await fetch('https://dummyjson.com/recipes?limit=110&skip=0');
        if (!res.ok) {
          throw new Error('network response was not ok');
        }
        const data = await res.json();
        setDishes(data.recipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getDishes();
  }, []);

  const expand = (id) => {
    setShowInfo(showInfo === id ? null : id);
  };

  if (loading) {
    return <div className="loading">loading...</div>;
  }

  if (error) {
    return <div className="error">oops, something went wrong: {error}</div>;
  }

  return (
    <div className="container">
      <div className="title-strip">
        <h1 className="main-title">recipe list</h1>
      </div>
      <div className="dish-grid">
        {dishes.map((dish) => {
          const isExpanded = showInfo === dish.id;

          return (
            <div
              key={dish.id}
              className={`dish-card ${isExpanded ? 'expanded' : ''}`}
              onClick={() => expand(dish.id)}
            >
              {isExpanded ? (
                <div className="expanded-content">
                  <img src={dish.image} alt={dish.name} className="expanded-image" />
                  <div className="info-box">
                    <h2 className="dish-name">{dish.name}</h2>
                    <p><strong>prep:</strong> {dish.prepTimeMinutes} mins</p>
                    <p><strong>cook:</strong> {dish.cookTimeMinutes} mins</p>
                    <p><strong>servings:</strong> {dish.servings}</p>
                    <h4>how to make it:</h4>
                    <ol>
                      {dish.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="small-card">
                  <img src={dish.image} alt={dish.name} className="dish-image" />
                  <div className="card-text">
                    <h2 className="dish-name">{dish.name}</h2>
                    <p>cuisine: {dish.cuisine}</p>
                    <p>difficulty: {dish.difficulty}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
