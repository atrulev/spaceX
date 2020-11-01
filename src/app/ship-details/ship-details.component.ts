import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { SpacexDataServiceService, Ships } from '../spacex-data-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.css']
})
export class ShipDetailsComponent implements OnInit {
  loaded = false;
  ship$: Observable<Ships[]>;
  ship: Ships;
  id = '';
  ports = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spacexService: SpacexDataServiceService
  ) {
    this.ship$ = spacexService.getShipsList(this.ports, this.id);
   }

  ngOnInit() {
    this.loaded = false;
    this.route.paramMap
    .pipe(
      map((params: ParamMap) => {
        console.log('ID: ', params.get('id'));
        return params.get('id'); }
      )
    )
    .subscribe(elem => {
      console.log('elem = ', elem);
      this.ship$ = this.spacexService.getShipsList(this.ports, elem);
      this.ship$.subscribe(val => {
        console.log('val = ', val);
        this.ship = val[0];
        this.loaded = true;
    });
    });

  }


}
