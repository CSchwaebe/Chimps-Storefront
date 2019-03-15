
export interface CollectionResponse {
  data: Collection
}

export interface AllCollectionsResponse {
  data: [Collection]
}

export class Collection {
  public active: boolean;
  public featured: boolean;
  public type: string;
  public name: string;
  public image: string;
  public stub: string;
  public shop?: string;
  public category?: string;
  public _id?: string;

  constructor() {

  }


}
