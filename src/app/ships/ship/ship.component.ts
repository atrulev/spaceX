import { Component, Input, OnInit } from '@angular/core';
import { Ships } from 'src/app/spacex-data-service.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
 @Input() item: Ships;
  constructor() { }
  ngOnInit(): void {

  }

}
