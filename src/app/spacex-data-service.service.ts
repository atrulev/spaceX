import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

export interface Ships{
  name: string;
  type: string;
  home_port: string;
  weight_kg: number;
  year_built: number;
  missions: {
    name: string;
  };
  id: number;
}
export interface Query {
  ships: Ships[];
}

const SHIPS_DATA_QUERY = gql `
{
  ships(limit: 8) {
    name
    type
    home_port
    weight_kg
    year_built
    missions {
      name
      flight
    }
    id
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class SpacexDataServiceService {
  data$: any;
  constructor( private apollo: Apollo) {
  this.data$ = this.apollo.watchQuery<Query>({
      query: SHIPS_DATA_QUERY,
    })
    .valueChanges.pipe(
      map(result => result.data.ships)
     );
   }
}
