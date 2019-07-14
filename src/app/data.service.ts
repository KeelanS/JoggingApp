import { Injectable } from '@angular/core';
import { Race } from './race.model';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import {map, mapTo, tap} from 'rxjs/internal/operators';
import {Runner} from './runner.model';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import { RunnerSorter } from './runnerSorter';

const endpoint = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private raceId = 0;

  private races: Race[] = [];
  private _races$ = new BehaviorSubject([]);
  races$: Observable<Race[]> = this._races$.asObservable();

  private runners: Runner[] = [];
  private _runners$ = new BehaviorSubject([]);
  runners$: Observable<Runner[]> = this._runners$;

  constructor( private http: HttpClient) { }

  // RaceID

  setRaceId(id: number) {
    this.raceId = id;
  }

  getRaceId(): number {
    return this.raceId;
  }

  getRaceName(): string {
    if (this.races.length !== 0) {
      return this.races.find(r => r.raceId === this.raceId).raceName;
    }
  }

  // Races

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

  removeRace(): Observable<boolean> {
    return this.http.delete(endpoint + 'races/' + this.raceId).pipe(tap(() => {
      const race = this.races.filter(race => this.raceId == race.raceId)[0];
      const raceIndex = this.races.indexOf(race);
      this.races.splice(raceIndex, 1);
      this._races$.next(this.races);
    }), mapTo(true));
  }

  // Runners

  getRunners(): Observable<boolean> {
    return this.http.get<Runner[]>(endpoint + 'races/' + this.raceId).pipe(
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

  addRunner(runner: Runner): Observable<Runner> {
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
    return this.http.delete(endpoint + `runners/${runner.startNumber}/${runner.race_id}`).pipe(
      tap(() => {
        const index = this.runners.indexOf(runner);
        this.runners.splice(index, 1);
        this._runners$.next(this.runners);
      }),
      mapTo(true)
    );
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
      const index = this.runners.findIndex(runner => runner.startNumber === r.startNumber);
      this.runners.splice(index, 1, r);
      this._runners$.next(this.runners);
    }), mapTo(true));
  }

  editRunnerList(lijst: Runner[]): Observable<boolean> {
    return this.http.put<Runner[]>(endpoint + 'runners', lijst).pipe(
      tap(runs => {
        this.runners = runs;
        this._runners$.next(this.runners);
      }),
      mapTo(true)
    );
  }

  resetCurrentRunnerList(): void {
    this.runners.forEach(r => {
      r.ranking = null;
      r.finish = null;
    });
    this.editRunnerList(this.runners).subscribe();
  }
}
