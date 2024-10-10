import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  // search for recipes using axios
  const searchRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(searchApi + query);
      setRecipes(response.data.meals || []); // handle null if no results
    } catch (error) {
      console.error("Error fetching the recipes:", error);
      setRecipes([]); // clear recipes if an error occurs
    }
    setIsLoading(false);
  };

  // Automatically search on initial render with an empty query
  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes(); // search when form is submitted
  };

  return (
    <div className="container">
      <h2>Food Recipe Finder</h2>
      <SearchBar
        isLoading={isLoading}
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>No Results.</p>
        )}
      </div>
    </div>
  );
}

export default App;
