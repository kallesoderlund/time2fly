import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight';


@Component({
    selector: 'app-main-page',
    templateUrl: './mainPage.component.html',
})


@Injectable()
export class MainPageComponent {

    constructor(private flightService: FlightService,
                private router: Router) { }
}
