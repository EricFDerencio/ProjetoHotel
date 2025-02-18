import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { GuestService } from '../../services/guest.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guests',
  imports: [ TableComponent],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss'
})
export class GuestsComponent implements OnInit {
  tableHeaders: string[] = [];
  tableData: string[][] = [];
  
  constructor(public guestService:GuestService){}

  ngOnInit() {
    this.getGuests();
  }
  getGuests(){
    this.guestService.getGuests().subscribe({
      next: (values) =>{ 
        this.tableHeaders = ['Nome', 'Email', 'Telefone', 'Documento'];
        this.tableData = values.map((guest) => [guest.name, guest.email, guest.phone, guest.document]);
      }
    });
  }
  addGuest(){
    
  }
}
