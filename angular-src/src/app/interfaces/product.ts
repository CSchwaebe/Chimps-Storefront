export interface Product {
    active: boolean,
    name: string,
    price: number,
    cost: number,
    weight: Weight,
    //sizes: Sizes,
    //quantity: Quantity,
    inventory: Variant[],
    color: string,
    description: string,
    shop: string,
    images: string[],
    category?: string,
    subcategory?: string,
    stub?: string,
    location?: string,
    _id?: string
}


export interface Variant {
    size?: string,
    color?: string,
    material?: string,
    quantity?: number,
    sku?: string,
    barcode?: any,
    weight?: number,
    trackInventory?: boolean
}


export interface Weight {
    pounds?: number,
    ounces?: number,
    grams?: number,
    kilograms?: number
}

export interface ProductResponse {
    data: Product;
}

export interface AllProductResponse {
    data: Product[];
}