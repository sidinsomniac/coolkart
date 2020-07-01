export interface Product {
    key: string,
    productTitle: string,
    productCategory: string,
    productCategoryName: string,
    productPrice: number,
    productDescription: string[],
    productImage: string,
    rating: number,
    reviewers: number
}

export interface ProductRaw {
    key: string,
    value: Product
}