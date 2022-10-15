import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleSubscriptionService {

  public static subscription = {
    connected: false,
    message: ''
  };
  constructor() { }
}
