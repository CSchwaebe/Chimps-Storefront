import { Collection } from './admin/collection';


export interface Cat {
    category: Collection;
    isOpen: boolean,
    subcategories: Collection[];
}

export interface Col {
    collection: Collection;
    isOpen: boolean,
    categories: Cat[];
}

export class Navbar {
    public collections: Col[];
    
    constructor() {

    }

}