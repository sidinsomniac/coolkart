import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
    items: ShoppingCartItem[]
}

export interface ShoppingCartTotal {
    items: ShoppingCart,
    totalCount: number,
    grandTotal: number,
    totalPrice: number[]
}