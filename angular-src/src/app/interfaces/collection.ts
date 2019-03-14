import { Category } from "./category";
import { Subcategory } from "./subcategory";
import { Product } from "./product";

export interface Collection {
    name: string,
    stub?: string,
    active?: boolean,
    categories?: Category[],
    subcategories?: Subcategory[],
    products?: [Product],
    
}

export interface CollectionResponse {
    data: Collection
}

export interface AllCollectionsResponse {
    data: [Collection]
}
