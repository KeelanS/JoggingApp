import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Runner} from "../runner";

@Component({
  selector: 'app-add-deelnemer-modal',
  templateUrl: './add-deelnemer-modal.component.html',
  styleUrls: ['./add-deelnemer-modal.component.css']
})
export class AddDeelnemerModalComponent implements OnInit {

  myForm = new FormGroup({
    startNumber: new FormControl(null),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormGroup({
      genderValue: new FormControl(null)
    }, Validators.required),
    // finish: new FormControl(null),
    // time: new FormControl('')
  });

  @Input() public runner: Runner;

  private title = "Deelnemer toevoegen";
  private buttonText = "Toevoegen";

  constructor(public dataService: DataService,
              public modalService: NgbModal,
  ) { }

  submitRunner() {
    if (this.runner == null) {
      const startNumber = this.myForm.value.startNumber;
      const name = this.myForm.value.firstName.trim() + ' ' + this.myForm.value.lastName.trim();
      const gender = this.myForm.get("gender").value.genderValue;
      const raceId = this.dataService.getRaceId();
      const runner = new Runner(startNumber, name, gender, null, raceId, null);
      this.dataService.addRunner(runner).subscribe();
      this.dataService.getRunners().subscribe();
      this.modalService.dismissAll('Data sent');
    } else {
      if (this.myForm.dirty) {
        if (this.myForm.controls.firstName.dirty || this.myForm.controls.lastName.dirty)
          this.runner.name = this.myForm.value.firstName.trim() + ' ' + this.myForm.value.lastName.trim();
        if (this.myForm.controls.gender.dirty)
          this.runner.gender = this.myForm.get("gender").value.genderValue;
        this.dataService.editRunner(this.runner).subscribe();
        // this.dataService.getRunners().subscribe();
        this.modalService.dismissAll('Data editted')
      } else {
        this.modalService.dismissAll('Nothing changed so nothing sent');
      }
    }
  }

  ngOnInit(): void {
    if (this.runner != null) {
      this.title = "Deelnemer aanpassen";
      this.buttonText = "Aanpassen";

      const spaceIndex = this.runner.name.indexOf(" ");
      const firstname = this.runner.name.substr(0, spaceIndex);
      const lastname = this.runner.name.substr(spaceIndex + 1);

      this.myForm.patchValue({
        startNumber: this.runner.startNumber,
        firstName: firstname,
        lastName: lastname,
      });
      this.myForm.get("gender").patchValue({
        genderValue: this.runner.gender
      })
    }
  }

}
