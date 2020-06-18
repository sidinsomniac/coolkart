export interface Product {
    productTitle: string,
    productCategory: string,
    productPrice: number,
    productDescription: string[],
    productImage: string
}

export interface ProductRaw {
    key: string,
    value: Product
}