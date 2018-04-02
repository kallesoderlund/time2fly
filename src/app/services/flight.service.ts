import { Http, Headers, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Flight } from '../models/flight';

const BASE_URL = 'https://hackinsas-backend.azurewebsites.net/api/travel-times';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class FlightService {
  constructor(private http: Http) {}

  loadFlight() {
    return this.http.get(BASE_URL)
      .map(res => res.json())
      .toPromise();
  }

  createFlight(flight: JSON): Observable<Flight> {
    return this.http.post(`${BASE_URL}`, JSON.stringify(flight), HEADER)
      .map(res => res.json());
  }

  updateFlight(flight: Flight) {
    return this.http.put(`${BASE_URL}${flight.flight_number}`, JSON.stringify(flight), HEADER)
      .map(res => res.json())
      .toPromise();
  }

  deleteFlight(flight: Flight) {
    return this.http.delete(`${BASE_URL}${flight.flight_number}`)
      .map(res => res.json())
      .toPromise();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
