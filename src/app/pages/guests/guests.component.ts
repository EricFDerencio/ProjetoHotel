import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { GuestService } from '../../services/guest.service';

import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Guest } from '../../models/guest.model';

@Component({
  selector: 'app-guests',
  imports: [TableComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {
  tableHeaders: string[] = [];
  tableData: string[][] = [];
  modalValues!: Guest[];
  isModalOpen: boolean = false;
  guestForm: FormGroup;
  nameModel: string = '';
  isEdit: boolean = false;

  constructor(public guestService: GuestService) {
    this.guestForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required, Validators.minLength(11)])
    });
  }

  ngOnInit() {
    this.getGuests();

  }

  onSubmit(isEdit: boolean) {
    if (this.guestForm.invalid) {
      console.log(this.guestForm.get("name")?.invalid);
      console.log(this.guestForm.get("email")?.invalid);
      console.log(this.guestForm.get("phone")?.invalid);
      console.log(this.guestForm.get("document")?.invalid);
    } else {
      if (isEdit == true) {
        this.updateGuest(this.modalValues[0]);
      } else {
        this.addGuest();

      }
    }
  }

  getGuests() {
    this.guestService.getGuests().subscribe({
      next: (values) => {
        this.tableHeaders = ['id', 'Nome', 'Email', 'Telefone', 'Documento'];
        this.tableData = values.map((guest) => [guest.id, guest.name, guest.email, guest.phone, guest.document]);
      }
    });
  }

  addGuest() {
    this.guestService.addGuest(this.guestForm.value).subscribe({
      next: () => {
        this.closeModal();
      }
    });
  }

  removeGuest(id: string) {
    this.guestService.removeGuest(id).subscribe({
      next: () => {
        this.getGuests();
      }
    });

  }

  getGuestById(id: string | number) {
    this.guestService.getGuestById(id).subscribe({
      next: (value) => {
        console.log(value);
        this.isEdit = true;
        this.modalValues = value;
        this.openModal();
        console.log(this.modalValues);

      },
    })
  }
  updateGuest(guest: Guest) {
    this.guestService.updateGuest(guest).subscribe({
      next: () => {
        this.closeModal();
      },
    })
  }
  editGuest(id: string) {
    this.getGuestById(id);

  }

  openModal() {
    this.isModalOpen = true;
    this.modalValues = [];
  }

  closeModal() {
    this.isModalOpen = false;
    this.getGuests();
  }
}
