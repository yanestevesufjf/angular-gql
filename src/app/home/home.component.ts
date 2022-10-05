import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

// FRONT END
export enum TipoVeiculo {
  MOTO,

  CARRO,

  CAMINHONETE
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  SUB = gql`
  subscription ($tipo: TipoVeiculo!){
    tipoVeiculoAdicionado(tipo: $tipo) {
      nome
      preco
    }
  }
  `
  // SUB = gql`
  // subscription {
  //   ofertaLancada {
  //     usuario
  //     valor
  //   }
  // }
  // `

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.subscribe({
      query: this.SUB,
      variables: {
        tipo: TipoVeiculo[TipoVeiculo.MOTO]
      }
    }).subscribe((obs) => {
      console.log(obs)
    })

  }

}
