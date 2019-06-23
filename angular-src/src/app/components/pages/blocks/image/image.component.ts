import { Component, Input, OnInit } from '@angular/core';
import { Image, ImageBlockData } from '../../models/blocks';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements Image, OnInit {
  @Input() data: ImageBlockData;

  constructor(public PageService: PageService) {
   
  }

  ngOnInit() {
  }

}
