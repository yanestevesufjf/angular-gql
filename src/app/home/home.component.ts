import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HandleSubscriptionService } from '../services/handle-subscription.service';

// export interface Mensagem {
//   sender: string;
//   ...
// }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  veiculos: any[] = [];

  SUB = gql`
  subscription {
    veiculoAdicionado {
      id
      nome
    }
  }
  `

  GET = gql`
    query {
      conversa {
        texto
        sender
      }
    }`

  SEND = gql`
  mutation ($texto: String!, $sender: String!){
    sendMensagem(texto: $texto, sender: $sender)
  }
  `

  LOGIN = gql`
  mutation ($login: LoginInput!){
    userLogin(login: $login)
  }
  `
  mensagens: any[] = []

  mensagemTexto: any = '';

  constructor(private apollo: Apollo) { 
    this.mensagemTexto = localStorage.getItem("access_token")?.toString();
  }

  connected() {
    return HandleSubscriptionService.subscription;
  }

  ngOnInit(): void {
    // this.getMensagens();
    this.subscribeMensagens();
  }

  // getMensagens() {
  //   this.apollo.watchQuery({
  //     query: this.GET
  //   }).valueChanges.subscribe((data: any) => {
  //     console.log('get mensagens')
  //     console.log(data.data)
  //     this.mensagens = [...data.data.conversa]
  //   })
  // }

  destroy$ = new Subject();
  async subscribeMensagens() {
    this.apollo.subscribe({
      query: this.SUB,
      errorPolicy: 'all'
    }).pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          console.log(data)
        }
      )
  }

  enviarMensagem() {
    // if (this.mensagem == '') return;
    console.log('token');
    console.log(this.mensagemTexto)
    localStorage.setItem("access_token", this.mensagemTexto);
    this.destroy$.next();
    this.destroy$.complete();
    window.location.reload();
    // this.apollo.mutate({
    //   mutation: this.SEND,
    //   variables: {
    //     texto: this.mensagemTexto,
    //     sender: "Yan"
    //   }
    // }).toPromise().then((data) => { console.log(data)}).catch(er => console.log(er))
  }


  realizaLogin() {
    this.apollo.mutate({
      mutation: this.LOGIN,
      variables: {
        input: {
          email: "yan.m.esteves@gmail.com",
          password: "123456"
        }
      }
    }).toPromise()
      .then((data: any) => {
        localStorage.setItem("access_token", data.data.userLogin);
      })
      .catch(er => console.log(er))
  }
}
