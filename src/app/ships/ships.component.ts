import { Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { SpacexDataServiceService, Ships } from '../spacex-data-service.service';


@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
  ships$: Ships[];
  constructor(private spacexService: SpacexDataServiceService) {

  }
 ngOnInit(){
  this.spacexService.data$.subscribe(result => {
    this.ships$ = result;
  });
}
}
