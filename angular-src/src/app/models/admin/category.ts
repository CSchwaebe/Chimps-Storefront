
/*
export interface Category {
    name: string,
    //collection: string,
    shop: string,
    stub?: string,
    active?: boolean,
    image?: String,
    category?: String,
    subcategory?: String,
    categories?: [String],
    subcategories?: Subcategory[],   
}
*/

export interface CategoryResponse {
    data: Category;
}

export interface AllCategoriesResponse {
    data: [Category]
}

export class Category {
  public name: string;
  public image: string;
  public shop: string;
  public active: boolean;
  public stub: string;

    constructor() { 
      
     }

}

