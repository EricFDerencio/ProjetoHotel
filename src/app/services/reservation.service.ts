import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url = 'http://localhost:3000';
  
    constructor(private http: HttpClient) { }
  
    public getReservations(): Observable<Reservation[]> {
  
      return this.http.get<Reservation[]>(`${this.url}/reservations`);
    }
    public getReservationById(id:string|number): Observable<Reservation[]> {
      const params = new HttpParams().set('id', id.toString());
      return this.http.get<Reservation[]>(`${this.url}/reservations`, {params});
    }
  
    public updateReservation(Reservation:Reservation ): Observable<Reservation[]> {
      const params = new HttpParams().set('id', Reservation.id.toString());
  
      return this.http.put<Reservation[]>(`${this.url}/reservations`+ params,Reservation);
    }
  
    public removeReservation(id:string|number): Observable<Reservation[]> {
      const params = new HttpParams().set('id',id.toString());
      return this.http.delete<Reservation[]>(`${this.url}/reservations`,{params});
    }
  
    // This method sends a new Reservation's data to the server
    public addReservation(Reservation: { name: string; email: string; phone: string; document: string; }): Observable<void> {
      return this.http.post<void>(`${this.url}/reservations`, { ...Reservation });
    }
}
