import styles from "./main.module.css";
import {
    Link,
    useLoaderData,
} from "react-router-dom";
import { getProducts } from "../../services/api";

export async function loader() {
    const products = await getProducts();
    return { products };
}

export const MainPage = () => {
    const { products } = useLoaderData();
    return (<>{products.length ? (
        <div className={styles.products}>
            {products.map((product) => (
                <div key={product.id}>
                    <Link to={`/${product.id}`}>
                        {product.colors ? (
                            <img src={product.colors[0].images[0]} className={styles.image} alt="карточка товара" />
                        ) : <p>no image</p>}
                        {product.name ? (
                            <>
                                {product.name}
                            </>
                        ) : (
                            <i>No Name</i>
                        )}
                    </Link>
                </div>
            ))}
        </div>
    ) : (
        <p>
            <i>No products</i>
        </p>
    )}</>);
};