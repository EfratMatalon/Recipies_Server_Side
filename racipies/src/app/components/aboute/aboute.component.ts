import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboute',
  templateUrl: './aboute.component.html',
  styleUrls: ['./aboute.component.css']
})
export class AbouteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo({behavior:"auto",top:0});
  }

}
