/*
export interface Collection {
    name: string,
    stub?: string,
    active?: boolean,
    //categories?: Category[],
    //subcategories?: Subcategory[],
    //products?: [Product],
    
}
*/

export interface CollectionResponse {
    data: Collection
}

export interface AllCollectionsResponse {
    data: [Collection]
}


export class Collection {
  public name: string;
  public stub: string;
  public active: boolean;
  public image: string;
  
    constructor(
       
      ) {  }

}
