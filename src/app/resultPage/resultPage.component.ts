import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../models/flight';
import { FlightService } from '../services/flight.service';
import { MainPageComponent } from '../mainPage/mainPage.component';
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
  currentInputData: JSON;
  busy: Subscription;
  flight: Flight;
  timePreference: String = 'Normal';
  updatedInfo = this.flight;
  extraTime: Number;
  timeThroughAirport: Number;
  totalTimeSecurity: Number;
  totalTimeCheckIn: Number;
  timeToGate: Number;
  timeToSecurity: Number;
  timeToCheckIn: Number;
  panelOpenState: Boolean = false;
  constructor(private router: Router,
    private flightService: FlightService, private dataService: DataService) {
  }

  ngOnInit() {
    const formData: JSON = this.dataService.getFormData();
    // this.currentInputData = this.dataService.getFormData();
    if (!formData) {
      this.gotoMain();
    }
    this.updateFlightInfo(formData);

  }

  updateFlightInfo(updatedInfo) {
    this.busy = this.flightService.createFlight(updatedInfo).subscribe((res: Flight) => {
      this.flight = res;
      this.calculateTimes(this.flight);
    });

  }

  updateTransportMode(transportMode: string) {
    const fd = this.dataService.getFormData();
    if (fd.transport_mode != null) {
      fd.transport_mode = transportMode;
    }
    this.updateFlightInfo(fd);
  }

  timeOnAriportChange(evt) {
    if (evt.value === 1) {
      this.timePreference = 'less';
    } else if (evt.value === 2) {
      this.timePreference = 'normal';
    } else {
      this.timePreference = 'more';
    }
    const formData = this.dataService.getFormData();
    formData.time_preference = this.timePreference;
    this.updateFlightInfo(formData);
    }

  gotoMain() {
    this.router.navigateByUrl('/main');
  }

  getFlight(): void {
    const test = this.dataService.getFlight();
  }


  calculateTimes(flight: Flight) {
      this.timeToGate = Number(this.flight.time_to_gate);
      this.timeToSecurity = Number(this.flight.time_to_security);
      this.timeToCheckIn = Number(this.flight.time_to_checkin);
      this.totalTimeSecurity = Number(this.timeToSecurity) + Number(this.flight.time_through_security);

      if (!this.flight.input_data.bags) {
        this.totalTimeCheckIn = Number(this.timeToCheckIn);
      } else {
        this.totalTimeCheckIn = (Number(this.timeToCheckIn) + Number(this.flight.time_through_checkin));
      }
    this.timeThroughAirport = (Number(this.totalTimeCheckIn)
    + Number(this.totalTimeSecurity)
    + Number(this.flight.time_through_security)
    + Number(this.timeToGate));
  }
}
