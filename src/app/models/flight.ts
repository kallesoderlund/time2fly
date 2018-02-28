export class Flight {
    public flight_info: any;
    public input_data: any;
    public transport_info: any;

    constructor(
       public bags: boolean,
       public flight_number: string,
       public origin_address: string,
       public transport_mode: string,
       public travel_date: string,
       public time_through_checkin: string,
       public time_through_security: string,
       public time_to_checkin: number,
       public time_to_gate: number,
       public time_to_security: number,
       public time_to_airport: string,
       public gate: string,
       public terminal: string,
       public arrival_destination: string,
       public latest_leave_time: string,
       public latest_leave_date: string,
    ) {}
 }
