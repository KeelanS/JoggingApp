import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../data.service';
import {Runner} from '../../runner.model';
import {ErrorStateMatcher} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-invullen-modal',
  templateUrl: './invullen-modal.component.html',
  styleUrls: ['./invullen-modal.component.css']
})
export class InvullenModalComponent implements OnInit {
  @ViewChild('previewList') list: ElementRef;
  matcher = new MyErrorStateMatcher();

  controleLijst: Runner[];
  lijst: Runner[] = [];
  myForm = new FormGroup({
    startnummer: new FormControl(null, [
      Validators.required,
      this.startnummerValidator.bind(this),
      this.alInLijstValidator.bind(this),
    ]),
    tijd: new FormControl('',  [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(3),
      Validators.maxLength(4),
      this.alleTijdenIngevuldValidator.bind(this),
      this.tijdNaVorigValidator.bind(this),
    ]),
  });
  toggle = true;
  selectedRowIndex = 0;
  timeIndex = 1;
  lastTime = 0;

  constructor(public dataService: DataService,
              public modalService: NgbModal,
  ) {  }

  ngOnInit() {
    this.controleLijst = this.dataService.getRunnersCopy();
    this.controleLijst.forEach(r => {
      r.finish = null;
    });
  }

  startnummerValidator(control: FormControl) {
    const nummer = control.value;
    if (nummer) {
      const runner = this.getRunnerById(nummer);
      if (!runner) {
        return {
          startNummer: {
            nullRunner: runner
          }
        };
      }
      return null;
    }
  }

  alInLijstValidator(control: FormControl) {
    const nummer = +control.value;
    if (nummer) {
      const runner = this.getRunnerById(nummer);
      if (!runner || this.lijst.find(r => r.startNumber === runner.startNumber)) {
        return {
          inLijst: {
            nummer: nummer,
          }
        };
      }
      return null;
    }
  }

  alleTijdenIngevuldValidator(control: FormControl) {
    if (this.controleLijst == null || this.selectedRowIndex > this.controleLijst.length) {
      return {allesIngevuld: true};
    }
    return null;
  }

  tijdNaVorigValidator(control: FormControl) {
    const tijd = control.value;
    if (tijd < this.lastTime) {
      return {
        vroeger: {
          tijd: tijd,
        }
      };
    }
    return null;
  }

  selectRank() {
    this.toggle = true;
    this.selectedRowIndex = 0;
    this.startnummer.reset();
  }

  selectTime() {
    this.list.nativeElement.scrollTop = 0;
    this.toggle = false;
    this.selectedRowIndex = this.timeIndex;
    this.tijd.reset();
  }

  get startnummer() {
    return this.myForm.get('startnummer');
  }

  get tijd() {
    return this.myForm.get('tijd');
  }

  getRunnerById(runnerStartnummer: number): Runner {
    return this.controleLijst.find(r => r.startNumber === runnerStartnummer);
  }

  getRunnerByRank(rank: number): Runner {
    return this.controleLijst.find(r => r.ranking === rank);
  }

  submitStartnummer() {
    if (this.startnummer.valid) {
      const runner = this.getRunnerById(this.startnummer.value);
      runner.ranking = this.lijst.length + 1;
      this.lijst.push(runner);
      this.startnummer.reset();
      setTimeout(() => {
          this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
      });
    }
  }

  submitTijd() {
    if (this.tijd.valid) {
      this.getRunnerByRank(this.timeIndex).finish = this.tijd.value;
      this.timeIndex++;
      this.selectedRowIndex++;
      this.lastTime = +this.tijd.value;
      this.tijd.reset();
      setTimeout(() => {
        const scrollHeight = this.list.nativeElement.scrollHeight / this.lijst.length;
        this.list.nativeElement.scrollTop = scrollHeight * (this.timeIndex - 1);
      });
    }
  }

  showTime(runner: Runner): string {
    const tijd = runner.finish;
    let result: string;
    if (tijd.length === 3) {
      result = '0' + tijd.substr(0, 1) + ':' + tijd.substr(1, 2);
    } else {
      result = tijd.substr(0, 2) + ':' + tijd.substr(2, 2);
    }
    return result;
  }

  getStartnummerErrorMessage() {
    return this.startnummer.hasError('required') ? 'Het startnummer moet ingevuld zijn' :
      this.startnummer.hasError('startNummer') ? 'Niemand in deze race heeft dat startnummer' :
        this.startnummer.hasError('inLijst') ? 'Deze persoon zit al in de lijst' : '';
  }

  getTijdErrorMessage() {
    return this.tijd.hasError('required') ? 'De tijd moet ingevuld zijn' :
      this.tijd.hasError('pattern') ? 'Enkel cijfers toegelaten' :
        (this.tijd.hasError('minlength', ) || this.tijd.hasError('maxlength')) ? 'Tijd is 3-4 cijfers lang' :
          this.tijd.hasError('allesIngevuld') ? 'Alle tijden zijn ingevuld' :
            this.tijd.hasError('vroeger') ? 'Tijd moet op of na vorige liggen' : '';
  }

  submitAll() {
    this.dataService.editRunnerList(this.lijst).subscribe();
    this.modalService.dismissAll('Data submitted');
  }

}
