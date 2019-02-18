import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Runner} from "../runner";

@Component({
  selector: 'app-add-deelnemer-modal',
  templateUrl: './add-deelnemer-modal.component.html',
  styleUrls: ['./add-deelnemer-modal.component.css']
})
export class AddDeelnemerModalComponent{

  myForm = new FormGroup({
    startNumber: new FormControl(null),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormGroup({
      genderValue: new FormControl(null)
    }, Validators.required)
  });

  constructor(public dataService: DataService,
              public modalService: NgbModal,
  ) { }

  submitRunner() {
    const startNumber = this.myForm.value.startNumber;
    const name = this.myForm.value.firstName.trim() + ' ' + this.myForm.value.lastName.trim();
    const gender = this.myForm.get("gender").value.genderValue;
    const raceId = this.dataService.raceId$.value;
    const runner = new Runner(startNumber, name, gender, null, raceId, null);
    this.dataService.addRunner(runner).subscribe();
    this.dataService.getRunners(raceId).subscribe();
    this.modalService.dismissAll('Data sent');
  }
}
