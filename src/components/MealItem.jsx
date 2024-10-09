import { currencFormatter } from "../util/formatting";
import Button from "../UI/button.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContex.jsx";

export default function MealItem({meal}) {

    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }

    return (

    <li className="meal-item" key={meal.id}>

    <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
        <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{currencFormatter.format(meal.price)}</p>
            <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meail-item-actions">
            <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
    </article>
    
    </li>  

    );

}