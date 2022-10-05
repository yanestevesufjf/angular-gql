import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  SUB = gql`
  subscription {
    ofertaLancada {
      usuario
      valor
    }
  }
  `

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.subscribe({
      query: this.SUB
    }).subscribe((obs) => {
      alert('Nova oferta recebida');
      console.log(obs)
    })

  }

}
