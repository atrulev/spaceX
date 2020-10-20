import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SpacexDataServiceService, Ships } from '../spacex-data-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.css']
})
export class ShipDetailsComponent implements OnInit {
  ship$: Observable<Ships[]>;
  ship: Ships;
  id = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spacexService: SpacexDataServiceService
  ) {
    this.id = route.snapshot.data.id;
    console.log('router id = ', this.id);
    this.ship$ = spacexService.getShipsList(this.id);
   }

  ngOnInit() {
    this.ship$.subscribe(val => {
      if (val[0].name !== '') {
        this.ship = val[0];
        console.log('Ship detail work');
      }
    });
  }


}
