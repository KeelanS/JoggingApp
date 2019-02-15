import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { HideService } from "./hide.service";
import { Race } from "./race";
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  // status$ = this.hideService.getStatus();
  race: Race;

  onSelect(race: Race): void {
    this.race = race;
    console.log(race.raceName);
  }

  constructor( public hideService: HideService,
               private dataService: DataService ) { }

   ngOnInit(): void {
      this.dataService.getRaces().subscribe();
   }
}
