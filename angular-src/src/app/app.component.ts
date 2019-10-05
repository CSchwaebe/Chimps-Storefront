import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NavbarService } from './services/navbar.service';
import { StyleService } from './services/style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-src';
  open = false;
  desktop: boolean = true;
  hamburger: any;
  @ViewChild('sidenav') sidenav;
  @ViewChild('app-navbar') navbar;

  
  constructor(private NavbarService: NavbarService, 
    public StyleService: StyleService) {
  }

  async ngOnInit() {
    await this.StyleService.get();
  }

 

  ngAfterViewInit() {
    // Look for .hamburger
    this.hamburger = document.querySelector(".hamburger");
    // On click
    /*
    this.hamburger.addEventListener("click", () => {
      // Toggle class "is-active"
      this.hamburger.classList.toggle("is-active");
      // Do something else, like open/close menu
      this.toggleSideNav();
    });
    */
    
  }

  toggleSideNav() {
    this.sidenav.toggle();
    this.hamburger.classList.toggle("is-active");
    this.open = !this.open;
    console.log('Toggle Sidenav')
    
    if (this.open) {
      this.NavbarService.hideDesktopNavbar();
    } else {
      this.NavbarService.showDesktopNavbar();
    }
    
  }

  



}
