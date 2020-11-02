import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subject, Subscription, Observable } from 'rxjs';
import {filter, map, switchMap, debounceTime} from 'rxjs/operators';


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

// const SHIPS_LIST_QUERY = gql `
// query NewQ($id: ID, $type: String, $port: String) {
//   ships(find: {id: $id, type: $type home_port: $port}) {
//     year_built
//     weight_kg
//     type
//     name
//     home_port
//     missions {
//       name
//     }
//   }
// }
// `;
const SHIP_DETAIL_QUERY = gql `
query NewQ($id: ID, $type: String, $port: String, $name: String) {
  ships(find: {type: $type, home_port: $port, id: $id, name: $name}) {
    year_built
    weight_kg
    type
    name
    home_port
    missions {
      name
    }
    id
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class SpacexDataServiceService {

  pagLength: number;
  getShipsList( ports: string[], id?: string, type?: string, name?: string): Observable<Ships[]> {
 return this.apollo.watchQuery<Query>({
  query: SHIP_DETAIL_QUERY,
  variables: {
    id: id,
    type: type,
    name: name
  }
 })
  .valueChanges.pipe(
    debounceTime(500),
    map(result => result.data.ships.filter(ship => ports.includes(ship.home_port))
   ));
  }
  constructor( private apollo: Apollo) {

   }
}
