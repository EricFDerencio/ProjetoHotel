import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/guest.model';


@Component({
  selector: 'app-reservations',
  imports: [TableComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {
  isModalOpen: boolean = false;
  guestForm: FormGroup;
  isEdit: boolean = false;
  tableHeaders!: string[];
  tableData!: string[][];
  name!:string;
  aux!:Guest[];
  cont:number=0;

  constructor(private reservationServices:ReservationService, private guestService:GuestService) {
    this.guestForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required, Validators.minLength(11)])
    });
  }
  ngOnInit(): void{
    this.getReservations();
    this.cont=0;
  }

  getReservations(){
    this.reservationServices.getReservations().subscribe({
      next: (values) =>{ 
        this.tableHeaders = ['id','guestId', 'checkIn', 'checkOut', 'roomType', 'numberOfGuests', 'status', 'remarks'];
        this.tableData = values.map(reservation => [
          reservation.id.toString(),
          reservation.guestId.toString(),
          reservation.checkIn,
          reservation.checkOut,
          reservation.roomType,
          reservation.numberOfGuests.toString(),
          reservation.status,
          reservation.remarks
        ]);

        
        this.tableData.forEach(element => {
          console.log(element[1].toString());
          this.getGuestById(element[1],element);
          
          
        });
      }
    });
  }

  getGuestById(id:string|number,element:string[]){
    this.guestService.getGuestById(id).subscribe({
      next: (value) => {
      console.log(this.aux);
      element[1]=this.aux[0].name;
      this.tableData[this.cont]=element;
      this.cont++;
      
      },
    })
  }

  onSubmit(isEdit: boolean) {

  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  editGuest($event: string) {
    throw new Error('Method not implemented.');
  }

  removeGuest($event: string) {
    throw new Error('Method not implemented.');
  }
}
