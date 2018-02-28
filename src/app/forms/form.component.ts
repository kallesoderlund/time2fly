import { Component, Input, forwardRef  } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight';
import { Router } from '@angular/router';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { DataService } from '../services/data.service';
const moment = _rollupMoment || _moment;


/** @title Form field with label */
@Component({
  selector: 'app-forms',
  templateUrl: 'form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormComponent),
      multi: true
    }
  ]
})
export class FormComponent implements ControlValueAccessor  {
  minDate = new Date();
  maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate() + 5);
  constructor(private flightService: FlightService,
    private router: Router,
    private dataService: DataService) { }

    @Input()
    _dateValue; // notice the '_'
    @Input() title: string;

  onFormSubmit(flightForm: NgForm) {
    const validFlight = flightForm.valid;
    flightForm.value.date = this.dateValue;
    const flight = JSON.stringify(flightForm.value);

    if (validFlight) {
      // this.getAllTextBox(flightFormResult);
      this.dataService.saveFormData(flightForm.value);
      this.goToResult();
    }
  }

  goToResult() {
    this.router.navigateByUrl('/result');
  }

  getAllTextBox(flightForm: JSON) {
    const result = this.flightService.createFlight(flightForm).subscribe((res: Flight) => {
      this.dataService.saveFlight(res);

    });
  }

  get dateValue() {
    return this._dateValue;
    // return moment(this._dateValue, 'YYYY-MM-DD');
  }

  set dateValue(val) {
    this._dateValue = moment(val).format('YYYY-MM-DD');
    this.propagateChange(this._dateValue);

  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateValue = moment(event.value, 'YYYY-MM-DD');


  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.dateValue = moment(value, 'YYYY/MM-DD');

    }
  }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;

  }

  registerOnTouched() { }
}
