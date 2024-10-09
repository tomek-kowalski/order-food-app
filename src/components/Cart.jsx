import { useContext } from "react"
import Modal from "../UI/Modal.jsx"
import CartContext from "../store/CartContex"
import { currencFormatter } from "../util/formatting.js";
import Button from "../UI/button.jsx";
import UserProgressContext from '../store/UserProgressContext.jsx';
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const CartCtx = useContext(CartContext);
    const UserProgressCtx = useContext(UserProgressContext);

    const CartTotal = CartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0 );

    function handleCloseCart() {
        UserProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        UserProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" 
        open={UserProgressCtx.progress === 'cart'}
        onClose={UserProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {CartCtx.items.map((item)=> (
                    <CartItem 
                    key={item.id} 
                    name={item.name} 
                    quantity={item.quantity} 
                    price={item.price}
                    onDecrease={()=>CartCtx.removeItem(item.id)}
                    onIncrease={()=>CartCtx.addItem(item)}
                    /> 
                ))}
            </ul>
            <p className="cart-total">{currencFormatter.format(CartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {CartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}