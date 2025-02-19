import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map } from 'rxjs';
import { Guest } from '../models/guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private url = 'http://localhost:3000/guests';

  constructor(private http: HttpClient) {}

  public getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.url}`);
  }

  public getGuestById(id: string | number): Observable<Guest> {
    return this.http.get<Guest>(`${this.url}/${id}`);
  }

  public updateGuest(guest: Guest): Observable<Guest> {
    return this.http.put<Guest>(`${this.url}/${guest.id}`, guest);
  }

  public removeGuest(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  public addGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(`${this.url}`, guest);
  }
  // Verifica se o email já está em uso
checkEmailExists(email: string): Observable<boolean> {
  const params = new HttpParams().set('email', email);
  return this.http.get<Guest[]>(this.url, { params }).pipe(
    map(guests => guests.length > 0), // Se houver hóspedes com o e-mail, retorna true
    catchError(() => of(false))
  );
}

// Verifica se o documento já está em uso
checkDocumentExists(document: string): Observable<boolean> {
  const params = new HttpParams().set('document', document);
  return this.http.get<Guest[]>(this.url, { params }).pipe(
    map(guests => guests.length > 0), // Se houver hóspedes com o documento, retorna true
    catchError(() => of(false))
  );
}
}
