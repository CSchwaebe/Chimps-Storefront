import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public width: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public desktopNavbar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public yOffset: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor() { 
    window.addEventListener("resize", () => {
      this.resize();
    });

    window.addEventListener("scroll", () => {
      this.calcYOffset();
    });

    this.resize();
    this.calcYOffset();
  }

  
  resize() {
    if (window.innerWidth <= 1024) {
      this.width.next(false);
    } else if (window.innerWidth > 1024) {
      this.width.next(true);
    }
  }


  getWidth() {
    return this.width.asObservable();
  }

  hideDesktopNavbar() {
    this.desktopNavbar.next(false);
  }

  showDesktopNavbar() {
    this.desktopNavbar.next(true);
  }

  getDesktopNavbar() {
    return this.desktopNavbar.asObservable();
  }


  calcYOffset() {
    this.yOffset.next(window.pageYOffset);
  }

  getYOffset() {
    return this.yOffset.asObservable();
  }


}
