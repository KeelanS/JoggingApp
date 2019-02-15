import { Component, OnInit } from '@angular/core';
import { HideService } from "../hide.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  status$ = this.hideService.getStatus();

  constructor(public hideService: HideService) { }

}
