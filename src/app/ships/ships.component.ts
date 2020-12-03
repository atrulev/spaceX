import { DataSource } from '@angular/cdk/table';
import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of, pipe, Subject } from 'rxjs';
import { SpacexDataServiceService, Ships } from '../spacex-data-service.service';
import { ShipComponent } from '../ships/ship/ship.component';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, map, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    typeShip: new FormControl(),
    portGroup: new FormGroup({
      canaveral: new FormControl(),
      ofLosAngeles: new FormControl(),
      fortLauderdale: new FormControl(),
    })
  });


  @ViewChild('paginator') paginator: MatPaginator;
  loaded = false;
  checkResult = true;
  // indeterminate = false;
  portsFilter = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];
  types = ['Barge', 'Cargo', 'High Speed Craft', 'Tug'];
  id = '';
  port = '';
  type = '';
  name = '';
  lengthPaginator = 0;
  size = 5;
  startIndex = 0;
  endIndex = 5;
  favoriteType = '';
  ships$: Observable<Ships[]>;
  pagLength: Observable<number>;
  destroy$ = new Subject<void>();
  displayedColumns: string[] = ['name', 'type', 'home_port'];
  dataSource: MatTableDataSource<Ships>;
  nameChange(name): void {
    this.getLoader();
    this.name = name;
    this.ships$ = this.spacexService.getShipsList(this.portsFilter, this.id, this.type, this.name);
    // this.ships$.subscribe(val => {
    // this.loaded = true;
    // });
    this.completeLoading();
  }
  portChange(): void {
    this.getLoader();
    this.portsFilter = [];
    if (this.form.get('portGroup.canaveral').value) { this.portsFilter.push('Port Canaveral'); }
    if (this.form.get('portGroup.ofLosAngeles').value) { this.portsFilter.push('Port of Los Angeles'); }
    if (this.form.get('portGroup.fortLauderdale').value) { this.portsFilter.push('Fort Lauderdale'); }
    if (this.portsFilter.length === 0) { this.portsFilter = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale']; }
    this.ships$ = this.spacexService.getShipsList(this.portsFilter, this.id, this.type, this.name);
    this.ships$.subscribe(val => {
      this.loaded = true;
    });
    this.setPagSize();
    this.completeLoading();
    // this.ships$.subscribe();

  }
  typeChange(): void {
    this.form.get('typeShip').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(type => {
      this.ships$ = this.spacexService.getShipsList(this.portsFilter, this.id, type, this.name);
      this.setPagSize();
      this.completeLoading();
    });
  }
  pageChange(event: PageEvent): void {
    this.setPagSize();
    this.startIndex = event.pageIndex * event.pageSize;
    if ((this.startIndex + event.pageSize) > this.lengthPaginator) {
      this.endIndex = this.lengthPaginator;
    }
    else { this.endIndex = this.startIndex + event.pageSize; }
  }
  setPagSize = () => {
    return this.ships$.subscribe(value => {
      this.lengthPaginator = value.length;
    });
  }
  getLoader = () => {
    this.loaded = false;
    this.checkResult = true;
    return this.loaded;
  }
  completeLoading = () => {
    this.ships$.subscribe(val => {
      if (val.length === 0) {
        console.log('val = ', val);
        this.checkResult = false;
      }
      this.loaded = true;
    });
    return this.checkResult;
  }
  constructor(private spacexService: SpacexDataServiceService) {
    this.ships$ = spacexService.getShipsList(this.portsFilter);
  }

  ngOnInit(): void {
    this.spacexService.getShipsList(this.portsFilter).subscribe(data => {
      this.dataSource = new MatTableDataSource<Ships>(data);
      this.setPagSize();
      this.dataSource.paginator = this.paginator;
      this.typeChange();
      this.loaded = true;
    });

  }
  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
