import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { HideService } from "../../hide.service";
import {DataService} from "../../data.service";
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { AddModalComponent } from "../../modals/add-modal/add-modal.component";
import { Race } from "../../race.model";
import { Observable} from "rxjs/index";
import {CdkDragDrop, moveItemInArray, CdkDragEnter, CdkDragExit, CdkDragStart, CdkDrag} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit{
  status$ = this.hideService.getStatus();
  races$: Observable<Race[]>;

  constructor( private hideService: HideService,
               private dataService: DataService,
               private modalService: NgbModal
  ) { };

  dropped(event: CdkDragDrop<string[]>) {
    const races = this.dataService.getRacesList();
    moveItemInArray(
      races,
      event.previousIndex,
      event.currentIndex
    );
  }

  open() {
    this.modalService.open(AddModalComponent, {centered: true});
  }

  ngOnInit(): void {
    this.races$ = this.dataService.races$;
  }
}
