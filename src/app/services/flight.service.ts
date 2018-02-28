import { Http, Headers, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Flight } from '../models/flight';

const BASE_URL = 'https://hackinsas-backend.azurewebsites.net/api/travel-times';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

// export interface Flight {
//   flight_number: string;
//   date: string;
//   address: string;
//   bags: boolean;
//   transport_mode: string;
// }

@Injectable()
export class FlightService {
  constructor(private http: Http,
    private messageService: MessageService) {}

  loadFlight() {
    return this.http.get(BASE_URL)
      .map(res => res.json())
      .toPromise();
  }

  // saveFlight(flight: Flight) {
  //   return (flight.flight_number) ? this.updateFlight(flight) : this.createFlight(flight);
  // }

  createFlight(flight: JSON): Observable<Flight> {
    return this.http.post(`${BASE_URL}`, JSON.stringify(flight), HEADER)
      .map(res => res.json());
  }

  // createFlightTest(flight: JSON) {
  //   return this.http.post(`${BASE_URL}`, JSON.stringify(flight), HEADER)
  //     .map(res => res.json())
  //     .toPromise();
  // }

  // createFlight2(): Observable<Flight[]> {
  //     this.messageService.add('addFlight');
  //     return of();
  // }

    // /** POST: add a new hero to the server */
    // addFlight (flight: Flight): Observable<Flight> {
    //   return this.http.post<Hero>(this.heroesUrl, flight, httpOptions).pipe(
    //     tap((hero: Flight) => this.log(`added flight w/ flightNumber=${flight.flight_number}`)),
    //     catchError(this.handleError<Flight>('addFlight'))
    //   );
    // }

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
