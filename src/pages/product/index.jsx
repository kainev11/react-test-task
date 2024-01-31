import styles from "./product.module.css";
import { useLoaderData } from "react-router-dom";
import { getProduct, getSizes } from "../../services/api";
import { ButtonList } from "../../components/button-list";
import { useEffect, useState } from "react";
import cart from "../../store/cart";
import { observer } from "mobx-react-lite";

export async function loader({ params }) {
    const product = await getProduct(Number(params.productId));
    const sizes = await getSizes();
    return { product, sizes };
}


export const ProductPage = observer(() => {
    const { product, sizes } = useLoaderData();
    const [color, setColor] = useState(product.colors[0]);
    const [size, setSize] = useState();
    const colors = product.colors;
    const [imageSrc, setImage] = useState(color.images[0]);
    useEffect(() => {
        if (!color.sizes.includes(size)) {
            setSize();
        }
        setImage(color.images[0]);
    }, [color])

    return (
        <div className={styles.productCard}>
            <div className={styles.images}>
                <img src={imageSrc} className={styles.mainImage} alt="" />
                <div className={styles.imageList}>{color.images.map(image => <img src={image} key={image} className={styles.image} alt="" onClick={() => setImage(image)} />)}</div>
            </div>
            <div className={styles.info}>
                <h3>{product.name}</h3>
                <p>{color.description}</p>
                <span>{color.price}</span>
                <ButtonList
                    fullList={sizes.map(size => ({ id: size.id, name: `${size.label} ${size.number}` }))}
                    availableList={color.sizes}
                    select={size}
                    setSelect={setSize} />
                <ButtonList
                    fullList={colors}
                    availableList={colors.map(color => color.id)}
                    select={color}
                    setSelect={setColor} />
                <button disabled={!(size && color)} onClick={() => cart.add({ name: product.name, size: size.name, color: color.name, price: color.price, image: color.images[0] })}>Добавить в корзину</button>
            </div >
        </div >);
})