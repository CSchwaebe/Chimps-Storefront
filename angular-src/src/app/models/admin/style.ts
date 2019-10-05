export interface StyleResponse {
  data: Style
}

export interface Theme {
  background: string;
  text: string;
  title: string;
}

export interface Buttons {
  background: string;
  text: string;
  dark_mode: boolean;
}

export interface Footer {
  background: string;
  text: string;
}

export interface Menu {
  primary_background: string;
  primary_text: string;

  topnav_dropdown_background: string;
  topnav_category_text: string;
  topnav_subcategory_text: string;

  sidenav_secondary_background: string;
  sidenav_secondary_text: string;
  sidenav_tertiary_background: string;
  sidenav_tertiary_text: string;
}

export class Style {
  public theme: Theme;
  public buttons: Buttons;
  public footer: Footer;
  public menu: Menu;

  public _id?: string;

  constructor() {

  }


}
