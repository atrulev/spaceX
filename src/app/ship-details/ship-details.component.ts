import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SpacexDataServiceService, Ships } from '../spacex-data-service.service';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.css']
})
export class ShipDetailsComponent implements OnInit {
 shipDetail: Ships;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    shipService: SpacexDataServiceService
  ) {
    console.log(route.params._value);
    this.shipDetail = shipService.data$;
    this.shipDetail.name = route.params._value.name;
   }

  ngOnInit() {}


}
