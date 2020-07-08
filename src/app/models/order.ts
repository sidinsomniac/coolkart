import { AppUser } from './app-user';
import { ShoppingCartTotal } from './shopping-cart';

export class Order {
    public datePlaced: number;
    public items: any[];
    public totalItems: number;
    public grandTotal: number;

    constructor(public userId: AppUser, public shippingDetails: any, shoppingCart: ShoppingCartTotal) {
        this.datePlaced = new Date().getTime();

        this.items = Object.values(shoppingCart.items).map((item, index) => ({
            quantity: item.quantity,
            title: item.product.productTitle,
            price: item.product.productPrice,
            imageUrl: item.product.productImage,
            totalPrice: shoppingCart.totalPrice[index]
        }));

        this.totalItems = shoppingCart.totalCount;
        this.grandTotal = shoppingCart.grandTotal;
    }
}