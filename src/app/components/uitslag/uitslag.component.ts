import {Component, Input, OnInit} from '@angular/core';
import {Runner} from '../../runner.model';

@Component({
  selector: 'app-uitslag',
  templateUrl: './uitslag.component.html',
  styleUrls: ['./uitslag.component.css']
})
export class UitslagComponent implements OnInit {
  @Input() runners: Runner[];

  eersteVrouwen: number[] = [];

  constructor() { }

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

  ngOnInit(): void {
    this.findTop3();
  }

  isTop3(runner: Runner) {
    return !!this.eersteVrouwen.find(sn => runner.startNumber === sn);
  }

  findTop3() {
    const vrouwen = this.runners.filter(r => r.gender === 'V' && !!r.ranking)
      .map(r => r.startNumber);
    if (vrouwen.length >= 3) {
      this.eersteVrouwen.push(...vrouwen.slice(0, 3));
    } else if (vrouwen.length !== 0) {
      this.eersteVrouwen.push(...vrouwen);
    }
  }

}
