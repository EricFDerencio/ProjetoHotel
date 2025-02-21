import { Component, EventEmitter, input, Input, Output, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [ RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() tableHeaders!: string[];
  @Input() tableData!: string[][];
  @Output() event =  new EventEmitter<void>();
  @Output() removeEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();
  routerAtive: boolean = false;

  constructor( private router:Router) {
    this.checkActiveRoute();
  }

  checkActiveRoute() {
    this.routerAtive = this.router.url.includes('/reservation');
  }

  emitEvent() {
    this.event.emit();
  }
  emitRemoveEvent(id:string){
    console.log(id);
    this.removeEvent.emit(id);
  }

  emitEditEvent(id:string){
    console.log("entrou no edit");
    this.editEvent.emit(id);
  }
}


