import { Injectable } from '@angular/core';
import { Race } from "./race";
import { BehaviorSubject, Observable } from "rxjs/index";
import { HttpClient } from "@angular/common/http";
import {mapTo, tap} from "rxjs/internal/operators";
import {Runner} from "./runner";

const endpoint = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //Saved to
  raceId$ = new BehaviorSubject(0);

  private races: Race[] = [];
  private _races$ = new BehaviorSubject([]);
  races$: Observable<Race[]> = this._races$.asObservable();

  private  runners: Runner[] = [];
  private _runners$ = new BehaviorSubject([]);
  runners$: Observable<Runner[]> = this._runners$;

  constructor( private http: HttpClient) { }

  //Races

  getRaces(): Observable<boolean> {
    return this.http.get<Race[]>(endpoint + 'races').pipe(
      tap(races => {
        this.races = races;
        this._races$.next(this.races);
      }),
      mapTo(true)
    );
  }

  getRacesList(): Race[] {
    return this.races;
  }

  setRaces(races: Race[]) {
    this._races$.next(races);
  }

  addRace(name: string): Observable<Race> {
    return this.http.post<Race>(endpoint + 'races', {name}).pipe(
      tap(race => {
        this.races.push(race);
        this._races$.next(this.races);
      })
    );
  }

  removeRace(): Observable<boolean>{

    return this.http.post(endpoint + 'races/' + this.raceId$.value + '/remove', {}).pipe(tap(r => {
      const race = this.races.filter(race => this.raceId$.value == race.raceId)[0];
      const raceIndex = this.races.indexOf(race);
      this.races.splice(raceIndex, 1);
      this._races$.next(this.races);
    }),mapTo(true));
  }

  //Runners

  getRunners(id: number): Observable<boolean> {
    return this.http.get<Runner[]>(endpoint + 'races/' + id + '/runners').pipe(
      tap(runs => {
        this.runners = runs;
        this._runners$.next(this.runners);
      }),
      mapTo(true)
    );
  }

  addRunner(runner: Runner): Observable<Runner>{
    const body = {
      startNumber: runner.startNumber,
      name: runner.name,
      gender: runner.gender,
      race_id: runner.race_id,
    };
    return this.http.post<Runner>(endpoint + 'runners', body).pipe(tap(r => {
      this.runners.push(r);
      this._runners$.next(this.runners);
    }));
  }

  removeRunner(runner: Runner): Observable<boolean> {
    return this.http.post(endpoint + 'runners/' + runner.startNumber + '/remove', {}).pipe(tap(r => {
      const index = this.runners.indexOf(runner);
      this.runners.splice(index, 1);
      this._runners$.next(this.runners);
    }),
      mapTo(true)
    )
  }
}
