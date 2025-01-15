import React from 'react';

export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
        <li key={index}>
            {ingredient}
            <button onClick={() => props.removeIngredient(index)}>x</button>
        </li>
    ));
    return (
        <section className="ingredients-container">
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length < 3 && <div className="get-recipe-container disabled">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Add atleast 3 ingredients to proceed.</p>
                </div>
                <button>Get a recipe</button>
            </div>}
            {props.ingredients.length >= 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </section>
    );
}