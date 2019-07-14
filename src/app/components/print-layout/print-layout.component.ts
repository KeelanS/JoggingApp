import {Component} from '@angular/core';
import {DataService} from '../../data.service';
import {HeaderNameService} from '../../header-name.service';
import {HideService} from '../../hide.service';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent {

  runners$ = this.dataService.runners$;
  eventName$ = this.nameService.name$;
  status$ = this.hideService.getStatus();
  raceName = this.dataService.getRaceName();

  constructor(private dataService: DataService,
              private nameService: HeaderNameService,
              private hideService: HideService) {
  }

  print() {
    window.print();
  }
}
