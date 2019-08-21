import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, destroyPlatform } from '@angular/core';

@Component({
  selector: 'app-kra-row',
  templateUrl: './kra-row.component.html',
  styleUrls: ['./kra-row.component.css']
})

export class KraRowComponent implements OnInit {
  @Input() iterator: any;
  index: any;
  @Input() kraValue: any;
  @Output() messageEvent = new EventEmitter<number>();
  kra: string;
  kraForm: any;
  textareaValue: string;

  constructor() {
  }

  ngOnInit() {
  }

  deleteRow() {
    this.index = this.iterator;
    this.messageEvent.emit(this.index);
  }

}

