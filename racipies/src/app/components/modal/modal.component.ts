import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  /** כותרת המודאל */
  title: string | null = null;

  constructor(public modalRef: MdbModalRef<ModalComponent>) {}

  close(){}

  save(){}

  ngOnInit(): void {
  }

}
