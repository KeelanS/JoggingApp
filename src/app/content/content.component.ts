import { Component } from '@angular/core';
import { HideService } from "../hide.service";
import {HeaderNameService} from "../header-name.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  status$ = this.hideService.getStatus();
  naam = this.headerNameService.name$;
  naamForm = new FormGroup({
    naam: new FormControl(this.naam),
  });

  constructor( public hideService: HideService,
               public headerNameService: HeaderNameService )
  { }

  changeName() {
    this.headerNameService.setName(this.naamForm.value.naam);
  }
}
