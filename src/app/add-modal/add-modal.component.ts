import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {

  myForm: FormGroup;

  addRace(name: string): void {
    this.dataService.addRace(name).subscribe();
    this.modalService.dismissAll('Data sent');
  }

  constructor(public dataService: DataService,
              private fb: FormBuilder,
              public modalService: NgbModal,
  ) {  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ''
    })
  }

}
