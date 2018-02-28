import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../models/flight';
import { FlightService } from '../services/flight.service';
import { MainPageComponent } from '../mainPage/mainPage.component';
import { MessageService } from '../services/message.service';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBusyModule } from 'ng-busy';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-result-page',
  templateUrl: './resultPage.component.html',
})

export class ResultPageComponent implements OnInit {
  busy: Subscription;
  flight: Flight;
  timeThroughAirport: Number;
  totalTimeSecurity: Number;
  totalTimeCheckIn: Number;
  timeToGate: Number;
  panelOpenState: Boolean = false;
  constructor(private router: Router,
    private flightService: FlightService, private dataService: DataService) {
  }

  ngOnInit() {
    const formData: JSON = this.dataService.getFormData();
    if (!formData) {
      this.gotoMain();
    }
    console.log(formData);
    this.busy = this.flightService.createFlight(formData).subscribe((res: Flight) => {
      this.flight = res;
      console.log('thisisit' + res);
      this.calculateTimes(this.flight);
      console.log('gate' + this.flight.time_to_gate);
    });

  }

  // ngOnInit() {
  //   const formData: JSON = this.dataService.getFormData();
  //   if (!formData) {
  //     this.gotoMain();
  //   }
  //   // console.log(formData);
  //   this.busy = this.flightService.createFlight(formData).map((res: Flight) => {
  //     this.flight = {
  //       flight_number: res.flight_number,
  //       bags: res.bags,
  //       transport_mode: res.transport_mode,
  //       origin_address: res.origin_address,
  //       travel_date: res.travel_date,
  //       time_through_checkin: res.time_through_checkin,
  //       time_through_security: res.time_through_security,
  //       time_to_airport: res.time_to_airport,
  //       time_to_checkin: res.time_to_checkin,
  //       time_to_gate: res.time_to_gate,
  //       time_to_security: res.time_to_security,
  //       gate: res.gate,
  //       terminal: res.terminal,
  //       arrival_destination: res.arrival_destination,
  //     };
  //     this.calculateTimes(this.flight);
  //     console.log('flight: ' + this.flight);
  //     console.log('address: ' + this.flight.origin_address);
  //   });

  // }

  gotoMain() {
    this.router.navigateByUrl('/main');
  }

  getFlight(): void {
    const test = this.dataService.getFlight();
  }

  calculateTimes(flight: Flight) {
    this.totalTimeSecurity = (Number(this.flight.time_to_security) + Number(this.flight.time_through_security));
    this.timeToGate = Number(this.flight.time_to_gate);
    if (this.flight.bags) {
      this.totalTimeCheckIn = (Number(this.flight.time_to_checkin) + Number(this.flight.time_through_checkin));
    } else {
      this.totalTimeCheckIn = 0;
    }
    this.timeThroughAirport = (Number(this.totalTimeCheckIn)
      + Number(this.flight.time_to_security)
      + Number(this.flight.time_through_security)
      + Number(this.flight.time_to_gate));
    // console.log(this.flight);
  }
}
