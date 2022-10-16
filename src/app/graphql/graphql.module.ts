import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { onError } from "@apollo/client/link/error";
import { ApolloClientOptions, ApolloError, ApolloLink, from, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpHeaders } from '@angular/common/http';
import { HandleSubscriptionService } from '../services/handle-subscription.service';

const uri = 'https://localhost:7064/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const http = httpLink.create({
    uri: uri
  });

  const ws = new WebSocketLink({
    uri: `wss://localhost:7064/graphql`,
    options: {
      reconnect: true,
      connectionParams: async () => {
        return {
          Authorization: `Bearer ${localStorage.getItem("access_token")}` || ''
        }
      },
      connectionCallback(error: any, result?) {
        if (error) {
          console.log(error);
          HandleSubscriptionService.subscription = {
            connected: false,
            message: error.message.toString()
          }
        } else {
          HandleSubscriptionService.subscription = {
            connected: true,
            message: ""
          }
        }
      }      
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log(`[GraphQL errors]`);
    console.log(graphQLErrors)

    if (networkError) {
      console.log(`[Network error]`);
      console.log(networkError);
    }
  });

  const link = split(
    ({ query }) => {
      const data = getMainDefinition(query);
      return (
        data.kind === 'OperationDefinition' && data.operation === 'subscription'
      );
    },
    ws,
    http
  )

  const auth = new ApolloLink((operation: any, forward: any) => {
    operation.setContext({
      headers: new HttpHeaders().set(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}` || '',
      )
    });

    return forward(operation);
  });

  return {
    link: from([
      auth,
      errorLink,
      link
    ]),
    cache: new InMemoryCache()
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
