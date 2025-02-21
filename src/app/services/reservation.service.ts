import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url = 'http://localhost:3000/reservations';
  
  constructor(private http: HttpClient) {}

  public getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.url);
  }

  public getReservationById(id: string | number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.url}/${id}`);
  }

  public addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.url, reservation);
  }

  public updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.url}/${reservation.id}`, reservation);
  }

  public removeReservation(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
