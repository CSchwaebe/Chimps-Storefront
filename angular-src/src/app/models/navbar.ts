import { Collection } from './admin/collection';
import { Page } from '../components/pages/models/page';


export interface Cat {
    category?: Collection;
    isOpen: boolean,
    subcategories: Collection[];
    page?: Page;
    subcategoryPages?: Page[];
}

export interface Col {
    collection?: Collection;
    isOpen: boolean,
    categories: Cat[];
    page?: Page;
}

export class Navbar {
    public collections: Col[];
    
    constructor() {

    }

}