import { Component } from '@angular/core';
import { HideService } from "../hide.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  status$ = this.hideService.getStatus();

  constructor( public hideService: HideService ) { }

}
