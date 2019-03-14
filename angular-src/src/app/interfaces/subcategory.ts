import { Category } from "./category";
import { Collection } from "./collection";
import { Product } from "./product";

export interface Subcategory {
    name: string,
    shop: string,
    category: string,
    active?: boolean,
    stub?: string,
    //collection: string,
    products?: [Product],
    image?: string
}


export interface SubcategoryResponse {
    data: Subcategory;
}

export interface AllSubcategoryResponse {
    data: Subcategory[];
}