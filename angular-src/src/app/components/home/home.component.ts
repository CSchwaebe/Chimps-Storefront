import { Component, OnInit } from '@angular/core';
//import { Slideshow } from '../../interfaces/slideshow'
import { SessionStorageService } from 'ngx-webstorage';
import { HomeService } from '../../services/home.service';
import { Home, Slideshow } from 'src/app/models/admin/home'
import { TitleService } from 'src/app/services/title.service';
import { Product } from 'src/app/models/admin/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shopName: string = 'Big Kat Original'
  slideIndex: number = 1;
  activeImage: number = -1;
  slideshow: Slideshow = {
    images: []
  }

  featuredProducts: boolean = true;
  featuredProductsTitle: string = 'Featured Products';
 model: Home;

  featuredGroups: boolean = true;
  featuredGroupsTitle: string = 'Collections';


  constructor(private SessionStorage: SessionStorageService,
    private HomeService: HomeService,
    public TitleService: TitleService,
    private ProductService: ProductService) {
    this.TitleService.setTitle(this.shopName);
    window.scrollTo(0,0);
  }


  async ngOnInit() {
    this.initSlideshow();
    this.model = await this.HomeService.get();

  }


  async initSlideshow() {
    let tmp = this.SessionStorage.retrieve('homeSlideshow');
    if (tmp === null) {
      this.slideshow.images = (await this.HomeService.get()).images;
      this.SessionStorage.store('homeSlideshow', this.slideshow.images);
      this.autoSlideshow();
    } else {
      this.slideshow.images = tmp;
      this.autoSlideshow();
    }


  }

  autoSlideshow() {
    if (this.activeImage === this.slideshow.images.length - 1)
      this.activeImage = 0;
    else
      this.activeImage++;

    setTimeout(() => {
      this.autoSlideshow();
    }, 9000); // Change image every 9 seconds
  }

}
