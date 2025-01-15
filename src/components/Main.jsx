import React from "react";
import IngredientsList from "./IngredientList.jsx";
import HuggingFaceRecipe from "./HuggingFaceRecipe.jsx";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "all the main spices",
    "corn",
    "hot sauce",
    "pasta",
  ]);
  const [recipe, setRecipe] = React.useState("");

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function removeIngredient(index) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
    recipe && setRecipe("");
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          removeIngredient={removeIngredient}
        />
      )}

      {recipe && <HuggingFaceRecipe recipe={recipe} />}
    </main>
  );
}
