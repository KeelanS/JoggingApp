import { Injectable } from '@angular/core';
import { Race } from "./race";
import { BehaviorSubject, Observable } from "rxjs/index";
import { HttpClient } from "@angular/common/http";
import {map, mapTo, tap} from "rxjs/internal/operators";
import {Runner} from "./runner";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

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

  private runners: Runner[] = [];
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

  addRace(name: string): Observable<Race> {
    return this.http.post<Race>(endpoint + 'races', {name}).pipe(
      tap(race => {
        this.races.push(race);
        this._races$.next(this.races);
      })
    );
  }

  removeRace(): Observable<boolean>{

    return this.http.post(endpoint + 'races/' + this.raceId$.value + '/remove', {}).pipe(tap(() => {
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

  getRunnersCopy(): Runner[] {
    return JSON.parse(JSON.stringify(this.runners));
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
    return this.http.post(endpoint + 'runners/' + runner.startNumber + '/remove', {}).pipe(tap(() => {
      const index = this.runners.indexOf(runner);
      this.runners.splice(index, 1);
      this._runners$.next(this.runners);
    }),
      mapTo(true)
    )
  }

  editRunner(runner: Runner): Observable<boolean> {
    const body = {
      startNumber: runner.startNumber,
      name: runner.name,
      gender: runner.gender,
      finish: runner.finish,
      race_id: runner.race_id,
      ranking: runner.ranking,
    };
    return this.http.put<Runner>(endpoint + 'runners/' + runner.startNumber, body).pipe(tap(r => {
      const index = this.runners.findIndex(runner => runner.startNumber == r.startNumber);
      this.runners.splice(index, 1, r);
      this._runners$.next(this.runners);
    }), mapTo(true));
  }

  editRunnerList(lijst: Runner[]): Observable<boolean> {
    return this.http.put(endpoint + 'runners', lijst).pipe(
      tap(r => this.getRunners(this.raceId$.value).subscribe()),
      mapTo(true)
    );
  }
}
