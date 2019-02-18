import { Component } from '@angular/core';
import { HideService } from "../hide.service";
import {HeaderNameService} from "../header-name.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  status$ = this.hideService.getStatus();

  constructor(public hideService: HideService,
              public headerName: HeaderNameService) { }

}
