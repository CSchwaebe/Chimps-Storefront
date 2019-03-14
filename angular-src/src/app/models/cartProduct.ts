import { Product } from 'src/app/models/admin/product';

export class CartProduct {
    product: Product;
    selectedSize: string;
    quantity: number;
    quantity_refunded: number;
    quantity_restocked: number;
    quantity_available_refund: number;
    quantity_available_restock: number;

    constructor(product?: Product,
                selectedSize?: string,
                quantity?: number,
                ) { 
                    this.product = product;
                    this.selectedSize = selectedSize;
                    this.quantity = quantity;
                    this.quantity_available_refund = quantity;
                    this.quantity_available_restock = quantity;
                    this.quantity_refunded = 0;
                    this.quantity_restocked = 0;
                }
    
            

}