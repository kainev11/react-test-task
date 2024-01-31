import { makeAutoObservable } from "mobx";

class Cart {
    cart = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : [];
    cartCount = this.cart.length;
    constructor() {
        makeAutoObservable(this);
    }

    add(product) {
        this.cart.push({ ...product, id: this.cartCount ? this.cart[this.cartCount - 1].id + 1 : 1 });
        this.cartCount = this.cart.length;
        localStorage.setItem('store', JSON.stringify(this.cart));
    }

    delete(id) {
        this.cart = this.cart.filter(product => product.id !== id);
        this.cartCount = this.cart.length;
        localStorage.setItem('store', JSON.stringify(this.cart));
    }
}

export default new Cart();