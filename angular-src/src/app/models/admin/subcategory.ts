/*
export interface Subcategory {
    name: string,
    shop: string,
    category: string,
    active?: boolean,
    stub?: string,
    //collection: string,
    //products?: [Product],
    image?: string
}
*/


export interface SubcategoryResponse {
  data: Subcategory;
}

export interface AllSubcategoryResponse {
  data: Subcategory[];
}

export class Subcategory {
  public name: string;
  public shop: string;
  public category: string;
  public active: boolean;
  public stub: string;
  public image: string;

  constructor() {

  }

}
