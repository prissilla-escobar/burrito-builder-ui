import { useState } from "react";

function OrderForm({ postForm }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.length || !ingredients.length) {
      alert('You need to enter a name and select at least one ingredient in order to submit an order. Thank you!')
      return
    }

    const orderEntered = {
      name: name,
      ingredients: ingredients
    }

    postForm(orderEntered)
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  function checkIng(e, clickedIngredient) {
    e.preventDefault()
    if (ingredients.includes(clickedIngredient)) {
      setIngredients(ingredients.filter(ingredient => ingredient !== clickedIngredient))
    } else {
      setIngredients([...ingredients, clickedIngredient])
    }
  }

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => checkIng(e, e.target.name)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button className='submit-button' onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
