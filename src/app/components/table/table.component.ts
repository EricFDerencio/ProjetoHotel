import { Component, EventEmitter, Input, Output, output } from '@angular/core';

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

  constructor() {}

  emitEvent() {
    this.event.emit()
  }
}
