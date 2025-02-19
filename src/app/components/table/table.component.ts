import { Component, EventEmitter, input, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() tableHeaders!: string[];
  @Input() tableData!: string[][];
  @Output() event =  new EventEmitter<void>();
  @Output() removeEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();

  constructor() {}

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
