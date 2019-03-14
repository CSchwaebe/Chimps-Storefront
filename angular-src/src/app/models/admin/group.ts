export class Group {

    constructor(
        public type: string,
        public name: string,
        public categories: string[],
        public subcategories: string[],
        public image: string,
        public active: boolean,
        public collection?: string,
        public category?: string,
        public subcategory?: string,
        public stub?: string,
        public shop?: string
        
      ) {  }

}

