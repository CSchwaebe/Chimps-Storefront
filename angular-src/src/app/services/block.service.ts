import { Injectable } from '@angular/core';
import { Block } from 'src/app/components/pages/types/block';
import { TextComponent } from 'src/app/components/pages/blocks/text/text.component';
import { VideoComponent } from 'src/app/components/pages/blocks/video/video.component';
import { SpacerComponent } from '../components/pages/blocks/spacer/spacer.component';
import { ImageComponent } from 'src/app/components/pages/blocks/image/image.component';


@Injectable({
  providedIn: 'root'
})
export class BlockService {



  constructor() {

  }
  
  attachComponentToData(type, data) {
    switch (type) {
      case 'Text': return new Block(TextComponent, data);
      break;
      case 'Image': return new Block(ImageComponent, data);
      break;
      case 'Video': return new Block(VideoComponent, data);
      break;
      case 'Spacer': return new Block(SpacerComponent, data);
      break;
    } 
  }







}
