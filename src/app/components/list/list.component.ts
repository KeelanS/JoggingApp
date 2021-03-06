import {Component, OnDestroy, OnInit} from '@angular/core';
import { HideService } from '../../hide.service';
import {DataService} from '../../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable, Subject } from 'rxjs/index';
import {filter, takeUntil} from 'rxjs/internal/operators';
import {Runner} from '../../runner.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddDeelnemerModalComponent} from '../../modals/add-deelnemer-modal/add-deelnemer-modal.component';
import {InvullenModalComponent} from '../../modals/invullen-modal/invullen-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  status$ = this.hideService.getStatus();
  lijst$: Observable<Runner[]>;
  naam: string;

  // route wordt gebruikt om te weten welke race je gebruikt
  constructor( public hideService: HideService,
               public dataService: DataService,
               private route: ActivatedRoute,
               private router: Router,
               private modalService: NgbModal) { }

  ngOnInit(): void {
    combineLatest(
      this.dataService.races$,
      this.route.params.pipe(filter(params => params && params.raceId))
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([races, params]) => {
      const race = races.find(race => race.raceId.toString() == params.raceId);
      if (!race) {
        this.router.navigate(['not-found']);
      } else {
        this.naam = race.raceName;
        this.lijst$ = this.dataService.runners$;
        this.dataService.setRaceId(race.raceId);
        this.dataService.getRunners().subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  addRunner() {
    this.modalService.open(AddDeelnemerModalComponent, {centered: true});
  }

  fillResults() {
    this.modalService.open(
      InvullenModalComponent, {
        centered: true,
        windowClass: 'app-modal-window',
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });
  }

  resetResults() {
    if (confirm('Ben je zeker dat je de resultaten wilt resetten?')) {
      this.dataService.resetCurrentRunnerList();
    }
  }

  updateRunner(runner: Runner) {
    const modalRef = this.modalService.open(AddDeelnemerModalComponent, {centered: true});
    modalRef.componentInstance.runner = runner;
  }

  removeRace() {
    if (confirm("Ben je zeker dat je de race: \'" + this.naam + "\' wilt verwijderen?")) {
      this.dataService.removeRace().subscribe();
      this.router.navigate(['']);
    }
  }

  removeRunner(runner: Runner) {
    if (confirm('Ben je zeker dat je ' + runner.name + ' wilt verwijderen?')) {
      this.dataService.removeRunner(runner).subscribe();
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

  // - - a - -  b - - c - -   d - - e -
  // - - - - 1  - - - - - 2   - - - - -
  // ------(a1)(b1)-|-(c1)(c2)(d2)---------

}
