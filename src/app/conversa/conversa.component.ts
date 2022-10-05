import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.component.html',
  styleUrls: ['./conversa.component.scss']
})
export class ConversaComponent implements OnInit {

  mensagens = [
    {
      texto: 'Olá mundo',
      sender: 'Yan'
    },
    {
      texto: 'Olá!',
      sender: 'João'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
