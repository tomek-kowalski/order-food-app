import { useContext } from 'react';
import LogoImg from '../assets/logo.jpg';
import Button from '../UI/button';
import CartContext from '../store/CartContex.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';


export default function Header() {
    const cartCtx = useContext(CartContext);
    const UserProgressCtx = useContext(UserProgressContext);

    console.log('cartCtx', cartCtx);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        UserProgressCtx.showCart();
    }

    return (

    <header id="main-header">
        <div id="title">
            <img src={LogoImg} alt="A restaurant" />
            <h1>Food Order Shop</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>
    </header>
    );
}