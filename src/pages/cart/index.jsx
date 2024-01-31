import { observer } from "mobx-react-lite";
import styles from "./cart.module.css";
import cart from "../../store/cart";

export const CartPage = observer(() => {
    return (<>{cart.cartCount ? (
        <div className={styles.products}>
            {cart.cart.map((product) => (
                <div key={product.id}>
                    <div>
                        {product.image ? (
                            <img src={product.image} className={styles.image} alt="карточка товара" />
                        ) : <p>no image</p>}
                        {product.name ? (
                            <>
                                {product.name}
                            </>
                        ) : (
                            <i>No Name</i>
                        )}
                        <p>Цвет: {product.color ? product.color : "No data"}</p>
                        <p>Цена: {product.price ? product.price : "No data"}</p>
                        <p>Размер: {product.size ? product.size : "No data"}</p>
                        <button onClick={() => cart.delete(product.id)}>удалить</button>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p>
            <i>No products</i>
        </p>
    )}</>);
})