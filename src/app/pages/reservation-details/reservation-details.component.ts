import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { RoomTypeService } from '../../services/room-type.service';
import { RoomType } from '../../models/room-type.model';
import { Reservation } from '../../models/reservation.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-details',
  imports:[CommonModule],
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
  reservations: string[][] = []; // Agora armazenando os dados como string[][]
  roomTypes: RoomType[] = [];
  guestId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private roomTypeService: RoomTypeService
  ) {}

  ngOnInit(): void {
    // Obtém o ID do hóspede da URL
    this.guestId = this.route.snapshot.paramMap.get('id');

    if (this.guestId) {
      this.loadReservationsByGuest(this.guestId);
    }

    this.loadRoomTypes();
  }

  loadReservationsByGuest(guestId: string): void {
    this.reservationService.getReservationById(guestId).subscribe((reservation: Reservation) => {
      this.reservations = [[
          reservation.id,
          reservation.roomType,
          reservation.checkIn,
          reservation.checkOut,
          reservation.numberOfGuests.toString(),
          reservation.status,
          reservation.remarks
        ].map(String)];
    });
  }

  loadRoomTypes(): void {
    this.roomTypeService.getRoomTypes().subscribe((data) => {
      this.roomTypes = data;
    });
  }
}
