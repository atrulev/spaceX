import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { SpacexDataServiceService, Ships } from '../spacex-data-service.service';



@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  checked = false;
  indeterminate = false;
  ports = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];
  types = ['Barge', 'Cargo', 'High Speed Craft', 'Tug'];
  id = '';
  port = '';
  type = '';
  name = '';
  favoriteType = '';
  ships$: Observable<Ships[]>;
  displayedColumns: string[] = ['name', 'type', 'home_port'];
  dataSource: MatTableDataSource<Ships>;
  portFilter: string[] = ['Port of Los Angeles', 'Fort Lauderdale'];
  nameChange(name): void {
  this.name = name;
  this.ships$ = this.spacexService.getShipsList(this.id, this.portFilter, this.type, this.name);
  }
  portChange(port){
  this.port = port;
  this.ships$ = this.spacexService.getShipsList(this.id, this.portFilter, this.type, this.name);
  }
  typeChange(type){
    this.type = type;
    this.ships$ = this.spacexService.getShipsList(this.id, this.portFilter, this.type, this.name);
    }
  constructor(private spacexService: SpacexDataServiceService) {
this.ships$ = spacexService.getShipsList();

  }

 ngOnInit() {
  this.spacexService.getShipsList().subscribe(data => {
this.dataSource = new MatTableDataSource<Ships>(data);
this.dataSource.paginator = this.paginator;
  });

}
}
