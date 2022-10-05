import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gql-integracao';

  constructor(private apollo: Apollo) { }


//   GET_CHARACTERS = gql`
//   query GetCharacters($ids: [Int!]!){
//      character(ids: $ids) {
//        name
//      }
//   }
//  `

//   SUB = gql`subscription{
//   subscribeProduct{
//     name,
//     cost,
//     createdDate
//   }
// }`

  ngOnInit() {
    // this.apollo.watchQuery({
    //   query: this.GET_CHARACTERS,
    //   variables: {
    //     ids: [1001, 1002]
    //   }
    // }).valueChanges.subscribe((data) => {
    //   console.log(data)
    // })

    // this.apollo.watchQuery({
    //   query: gql`
    //   {
    //     api_info {
    //       author # nome da operação (query) e o parametro
    //     }
    //   }
    //   `
    // }).valueChanges.subscribe((data: any) => {
    //   console.log(data);
    // })
  }
}
