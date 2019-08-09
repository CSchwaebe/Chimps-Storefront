export interface StyleResponse {
  data: Style
}

export class Style {
  public background: string;
  public primary_font_color: string;
  public header_font_color: string;
  public button_background: string;
  public button_text: string;

  public nav_primary_background: string;
  public nav_primary_text: string;
  public topnav_dropdown_background: string;
  public topnav_category_text: string;
  public topnav_subcategory_text: string;

  public sidenav_secondary_background: string;
  public sidenav_secondary_text: string;
  public sidenav_tertiary_background: string;
  public sidenav_tertiary_text: string;

  public footer_background: string;
  public footer_text: string;
  
  public _id?: string;

  constructor() {

  }


}
