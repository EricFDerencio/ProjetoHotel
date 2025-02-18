import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from '../models/guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private url='http://localhost:3000';

  constructor(private http:HttpClient) { }
  
  public getGuests(): Observable<Guest[]> {

    return this.http.get<Guest[]>(`${this.url}/guests` );
  }

  // This method sends a new guest's data to the server
  public addGuest(guest: { name: string; email: string }): Observable<unknown> {
    return this.http.post<unknown>(`${this.url}/guests`, {...guest});
  }
}
