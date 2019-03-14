import { Product } from './product';

export interface CartProduct {
    product: Product,
    selectedSize: string,
    quantity: number,
    quantity_refunded?: number,
    quantity_restocked?: number,
    quantity_available_refund?: number,
    quantity_available_restock?: number,
}

export interface Cart {
    products: CartProduct[]
}

