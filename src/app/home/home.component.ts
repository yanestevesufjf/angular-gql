import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  veiculos: any[] = [];

  SUB = gql`
  subscription {
    ofertaLancada {
      usuario,
      valor,
    }
  }
  `

  GET_VEICULOS = gql`
    query {
      veiculos{
        nome
      }
    }`

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getVeiculos();
    this.subscribeVeiculos();
  }

  getVeiculos() {
    this.apollo.watchQuery({
      query: this.GET_VEICULOS
    }).valueChanges.subscribe((data) => {
      console.log('get veiculos')
      console.log(data)
    })
  }

  subscribeVeiculos() {
    this.apollo.subscribe({
      query: this.SUB
    }).subscribe((obs) => {
      alert('NOVA OFERTA')
      console.log(obs)
    })
  }

}
