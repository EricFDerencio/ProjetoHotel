import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuestService } from '../../services/guest.service';
import { TableComponent } from "../../components/table/table.component";
import { CommonModule } from '@angular/common';
import { Guest } from '../../models/guest.model';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
  imports: [TableComponent, ReactiveFormsModule, CommonModule]
})
export class GuestsComponent implements OnInit {
  tableHeaders: string[] = [];
  tableData: string[][] = [];
  isModalOpen: boolean = false;
  guestForm: FormGroup;
  isEdit: boolean = false;
  currentGuestId: string | null = null;

  constructor(private guestService: GuestService) {
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

  onSubmit() {
    if (this.guestForm.invalid) {
      console.log('Formulário inválido:', this.guestForm.errors);
      return;
    }

    const guestData: Guest = this.guestForm.value;

    this.guestService.getGuests().subscribe(guests => {
      const emailExists = guests.some(g => g.email === guestData.email && g.id !== this.currentGuestId);
      const documentExists = guests.some(g => g.document === guestData.document && g.id !== this.currentGuestId);

      if (emailExists) {
        alert('Este e-mail já está em uso.');
        return;
      }
      if (documentExists) {
        alert('Este documento já está em uso.');
        return;
      }

      if (this.isEdit && this.currentGuestId) {
        this.updateGuest();
      } else {
        this.addGuest();
      }
    });
  }

  getGuests() {
    this.guestService.getGuests().subscribe((guests) => {
      this.tableHeaders = ['ID', 'Nome', 'Email', 'Telefone', 'Documento'];
      this.tableData = guests.map(guest => [
        guest.id,
        guest.name,
        guest.email,
        guest.phone,
        guest.document
      ]);
    });
  }

  addGuest() {
    this.guestService.addGuest(this.guestForm.value).subscribe(() => {
      this.closeModal();
      this.getGuests();
    });
  }

  removeGuest(id: string) {
    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
      this.guestService.removeGuest(id).subscribe(() => {
        this.getGuests();
      });
    }
  }

  editGuest(id: string) {
    this.guestService.getGuestById(id).subscribe((guest) => {
      this.isEdit = true;
      this.currentGuestId = guest.id;
      this.guestForm.patchValue({
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        document: guest.document
      });
      this.openModal();
    });
  }

  updateGuest() {
    const updatedGuest = { id: this.currentGuestId, ...this.guestForm.value };
    this.guestService.updateGuest(updatedGuest).subscribe(() => {
      this.closeModal();
      this.getGuests();
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  openModalForAdd() {
    this.isEdit = false;
    this.currentGuestId = null;
    this.guestForm.reset();
    this.openModal();
  }

  closeModal() {
    this.isModalOpen = false;
    this.guestForm.reset();
  }
}
