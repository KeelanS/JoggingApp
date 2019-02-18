import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class HeaderNameService {

  name$ = new BehaviorSubject("Kermisjogging");

  constructor() { }

  setName(name: string) {
    this.name$.next(name);
  }
}
