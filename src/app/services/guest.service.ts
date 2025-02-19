import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from '../models/guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getGuests(): Observable<Guest[]> {

    return this.http.get<Guest[]>(`${this.url}/guests`);
  }
  public getGuestById(id:string|number): Observable<Guest[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Guest[]>(`${this.url}/guests`, { params });
  }

  public updateGuest(guest:Guest ): Observable<Guest[]> {
    const params = new HttpParams().set('id', guest.id.toString());

    return this.http.put<Guest[]>(`${this.url}/guests`+guest.id, {params});
  }

  public removeGuest(id:string|number): Observable<Guest[]> {
    const params = new HttpParams().set('id',id);
    return this.http.delete<Guest[]>(`${this.url}/guests/`+id,{params});
  }

  // This method sends a new guest's data to the server
  public addGuest(guest: { name: string; email: string; phone: string; document: string; }): Observable<void> {
    return this.http.post<void>(`${this.url}/guests`, { ...guest });
  }
}