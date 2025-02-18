import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";


@Component({
  selector: 'app-reservations',
  imports: [TableComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {

}
