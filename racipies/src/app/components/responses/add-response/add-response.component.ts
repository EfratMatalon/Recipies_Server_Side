import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-add-response',
  templateUrl: './add-response.component.html',
  styleUrls: ['./add-response.component.css']
})
export class AddResponseComponent implements OnInit {

  @Output() prove = new EventEmitter();
  @Input() resToAdd:string|undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onProve(){
    this.prove.emit(this.resToAdd);
    //TODO לטפל שלא יקרה במקרה שהתגובה לא נקלטה בדאטא בייס
    this.resToAdd = "";
  }

}
