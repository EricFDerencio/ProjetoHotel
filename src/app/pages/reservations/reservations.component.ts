import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/guest.model';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-reservations',
  imports: [TableComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {
  isModalOpen: boolean = false;
  isEdit: boolean = false;
  editingReservationId: number | null = null;
  reservationForm: FormGroup;
  filterForm: FormGroup;
  tableHeaders: string[] = ['ID', 'Hóspede', 'Check-In', 'Check-Out', 'Tipo de Quarto', 'Número de Hóspedes', 'Status', 'Observações'];
  tableData: string[][] = [];
  filteredData: string[][] = [];
  guests: Guest[] = [];
  reservations: Reservation[] = [];
  roomAvailability = { Standard: 10, Deluxe: 5, Suite: 3 };
  roomCapacity = { Standard: 2, Deluxe: 4, Suite: 6 };

  constructor(private reservationService: ReservationService, private guestService: GuestService) {
    this.reservationForm = new FormGroup({
      guestId: new FormControl('', Validators.required),
      checkIn: new FormControl('', Validators.required),
      checkOut: new FormControl('', Validators.required),
      roomType: new FormControl('', Validators.required),
      numberOfGuests: new FormControl('', [Validators.required, Validators.min(1)]),
      status: new FormControl('Confirmada', Validators.required), // Novo campo de status
      remarks: new FormControl('')
    });
    this.filterForm = new FormGroup({
      status: new FormControl(''),
      roomType: new FormControl(''),
      checkIn: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getGuests();
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getReservations().subscribe(values => {
      this.reservations = values;
      this.updateTableData();
    });
  }

  updateTableData() {
    this.filteredData = this.reservations.map(reservation => this.mapReservationToTable(reservation));
  }

  mapReservationToTable(reservation: Reservation): string[] {
    return [
      reservation.id.toString(),
      this.getGuestNameById(reservation.guestId.toString()),
      reservation.checkIn,
      reservation.checkOut,
      reservation.roomType,
      reservation.numberOfGuests.toString(),
      reservation.status,
      reservation.remarks
    ];
  }

  getGuestNameById(guestId: string): string {
    const guest = this.guests.find(g => g.id === guestId);
    return guest ? guest.name : 'Desconhecido';
  }

  getGuests() {
    this.guestService.getGuests().subscribe(values => this.guests = values);
  }

  applyFilter() {
    let { status, roomType, checkIn } = this.filterForm.value;
    this.filteredData = this.reservations
      .filter(res =>
        (!status || res.status === status) &&
        (!roomType || res.roomType === roomType) &&
        (!checkIn || res.checkIn === checkIn)
      )
      .map(reservation => this.mapReservationToTable(reservation));
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const reservationData: Reservation = this.reservationForm.value;

      if (new Date(reservationData.checkOut) <= new Date(reservationData.checkIn)) {
        alert('A data de check-out deve ser posterior à data de check-in.');
        return;
      }

      this.reservationService.getReservations().subscribe(reservations => {
        const existingReservations = reservations.filter(res =>
          res.roomType === reservationData.roomType &&
          new Date(res.checkOut) > new Date(reservationData.checkIn) &&
          new Date(res.checkIn) < new Date(reservationData.checkOut)
        );

        if (existingReservations.length >= this.roomAvailability[reservationData.roomType as keyof typeof this.roomAvailability]) {
          alert('Não há disponibilidade para o tipo de quarto selecionado.');
          return;
        }

        if (reservationData.numberOfGuests > this.roomCapacity[reservationData.roomType as keyof typeof this.roomCapacity]) {
          alert('O número de hóspedes excede a capacidade máxima do quarto.');
          return;
        }

        if (this.isEdit && this.editingReservationId !== null) {
          reservationData.id = this.editingReservationId;
          this.reservationService.updateReservation(reservationData).subscribe(() => {
            this.getReservations();
            this.closeModal();
          });
        } else {
          this.reservationService.addReservation(reservationData).subscribe(() => {
            this.getReservations();
            this.closeModal();
          });
        }
      });
    }
  }

  editReservation(reservationId: string) {
    this.reservationService.getReservationById(reservationId).subscribe(reservation => {
      this.reservationForm.setValue({
        guestId: reservation.guestId,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        roomType: reservation.roomType,
        numberOfGuests: reservation.numberOfGuests,
        status: reservation.status,
        remarks: reservation.remarks
      });

      this.isEdit = true;
      this.editingReservationId = reservation.id;
      this.openModal();
    });
  }

  removeReservation(reservationId: string) {
    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
      this.reservationService.removeReservation(reservationId).subscribe(() => {
        this.getReservations();
      });
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEdit = false;
    this.editingReservationId = null;
    this.reservationForm.reset({
      status: 'Confirmada'
    });
  }
}
