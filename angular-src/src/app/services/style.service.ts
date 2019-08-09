import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Style, StyleResponse } from 'src/app/models/admin/style';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  url: string = environment.baseURL + 'api/style/'
  
  public style: Style;

  constructor(private http: HttpClient) { }

  async post(style: Style) {
    return new Promise<Style>(async (resolve, reject) => {
      this.http.post(this.url, style).subscribe((res: StyleResponse) => {
        resolve(res.data);
      });
    })
  }

  async get() {
    
    this.style = {
      background: 'grey',
      primary_font_color: 'black',
      header_font_color: '#525252',
      button_background: '#00012e',
      button_text: '#fbfbfe',

      nav_primary_background: '#fbfbfe',
      nav_primary_text: '#00012e',
      topnav_dropdown_background: '#00012e',
      topnav_category_text: '#bdbdbd',
      topnav_subcategory_text: '#fbfbfe',

      sidenav_secondary_background: '#f8f8fc',
      sidenav_secondary_text: '#00012e',
      sidenav_tertiary_background: '#00012e',
      sidenav_tertiary_text: '#fbfbfe',

      footer_background: '#00012e',
      footer_text: '#fbfbfe'
      
    }


    return
    /*
    return new Promise<Style>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: StyleResponse) => {
        resolve(res.data);
      });
    })
    */
  }

  async update(style: Style) {
    return new Promise<Style>(async (resolve, reject) => {
      this.http.post(this.url + 'update', style).subscribe((res: StyleResponse) => {
        resolve(res.data);
      });
    })
  }

}
