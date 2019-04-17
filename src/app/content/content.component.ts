import {Component, OnInit} from '@angular/core';
import { HideService } from "../hide.service";
import {HeaderNameService} from "../header-name.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Race} from "../race.model";
import {Observable} from "rxjs/index";
import {DataService} from "../data.service";
import {AddModalComponent} from "../add-modal/add-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{

  status$ = this.hideService.getStatus();
  naam$ = this.headerNameService.name$;
  races$: Observable<Race[]>;
  naamForm = new FormGroup({
    naam: new FormControl(this.naam$.getValue()),
  });

  constructor( public hideService: HideService,
               public headerNameService: HeaderNameService,
               public dataService: DataService,
               private modalService: NgbModal)
  { }

  changeName() {
    this.headerNameService.setName(this.naamForm.value.naam);
  }

  open() {
    this.modalService.open(AddModalComponent, {centered: true});
  }

  ngOnInit(): void {
    this.races$ = this.dataService.races$;
  }
}
