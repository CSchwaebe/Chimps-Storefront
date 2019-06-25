import { Block } from '../types/block';

export class Page {
    public title: string;
    public stub: string;
    public blocks: Block[];
    public menu: Menu;
    public _id?: string;

    constructor() {
       
    }
}

export interface Menu {
    location: string,
    level: string,
    shop?: string,
    category?: string,
}

export interface PageResponse {
    data: Page
}


export interface MultiplePageResponse {
    data: Page[]
}