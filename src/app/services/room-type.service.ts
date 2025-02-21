import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomType } from '../models/room-type.model';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  private url = 'http://localhost:3000/roomTypes';

  constructor(private http: HttpClient) {}

  public getRoomTypes(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(this.url);
  }
}
