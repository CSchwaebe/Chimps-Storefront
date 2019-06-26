import { Component, AfterViewInit, ViewChild } from '@angular/core';

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

  constructor() {

  }

 

  ngAfterViewInit() {
    // Look for .hamburger
    this.hamburger = document.querySelector(".hamburger");
    // On click
    this.hamburger.addEventListener("click", () => {
      // Toggle class "is-active"
      this.hamburger.classList.toggle("is-active");
      // Do something else, like open/close menu
      this.collapse();
    });
  }

  collapse() {
    this.open = !this.open;
    this.hamburger.classList.toggle("is-active");
  }

}
