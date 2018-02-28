import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';

@Injectable()
export class DataService {
 flight: Flight;
 formData: JSON;

 saveFlight(flight: Flight) {
   this.flight = flight;
 }

 getFlight(): Flight {
     return this.flight;
 }

  saveFormData(formData: JSON) {
    this.formData = formData;
  }

  getFormData(): JSON {
      return this.formData;
  }


 clear() {
   this.flight = null;
   this.formData = null;
 }
}
