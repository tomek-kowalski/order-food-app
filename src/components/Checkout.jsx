import { useContext } from "react";
import Modal from "../UI/Modal"
import CartContext from "../store/CartContex.jsx";
import { currencFormatter } from "../util/formatting.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";


const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' 
    },
};

export default function Checkout() {

    const CartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending, 
        error,
        sendRequest,
        clearData
        } = useHttp('http://localhost:3000/orders',requestConfig);

    const CartTotal = CartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0 );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        CartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
                JSON.stringify({
                    order: {
                        items: CartCtx.items,
                        customer: customerData,
                    },
                })
        );
    }


    let actions = (
        <>
            <Button onClick={handleClose} textOnly type="button">Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if(isSending) {
        actions = <span>Sending Order Data...</span>;
    }

    if(data && !error) {

        return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted sucessfully</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions">
            <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
        );
    }

    return (

        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencFormatter.format(CartTotal)}</p>
                <Input label="Full Name" type="text" id="name"/>
                <Input label="E-mail Address" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                {error && <Error title="Failed to submit order" message={error}/>}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>

        </Modal>

    );
}