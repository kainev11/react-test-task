import { Outlet } from "react-router-dom";
import styles from "./layout.module.css"
import { Link } from "react-router-dom";
import cart from "../../store/cart";
import { observer } from "mobx-react-lite";

export const Layout = observer(() => {
    return (<main className={styles.main}>
        <Link to='/'>Каталог</Link>
        <Link to='/cart'>Корзина: {cart.cartCount}</Link>
        <Outlet />
    </main>)
})