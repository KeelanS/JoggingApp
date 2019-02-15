import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class HideService {
  status$ = new BehaviorSubject(true);

  getStatus(): Observable<boolean> {
    return this.status$;
  }

  change(): void {
    this.status$.next(!this.status$.getValue());
  }
}
