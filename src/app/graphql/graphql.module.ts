import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { onError } from "@apollo/client/link/error";
import { ApolloClientOptions, ApolloLink, from, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpHeaders } from '@angular/common/http';

const uri = 'https://localhost:7230/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const auth = new ApolloLink((operation: any, forward: any) => {
    operation.setContext({
      headers: new HttpHeaders().set(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}` || '',
      )
    });

    return forward(operation);
  });

  const http = httpLink.create({
    uri: uri
  });

  const ws = new WebSocketLink({
    uri: `wss://localhost:7230/graphql`,
    options: {
      reconnect: true
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
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

//   const errorLink = onError(({ graphQLErrors, networkError }) => {
//     console.log(`[GraphQL errors]`);
//     console.log(graphQLErrors)

//     if (networkError) {
//       console.log(`[Network error]`);
//       console.log(networkError);
//     }
//   });

//   return {
//     link: from([
//       errorLink,
//       httpLink.create({ uri })
//     ]),
//     cache: new InMemoryCache()
//   }
// }

// @NgModule({
//   exports: [ApolloModule],
//   providers: [
//     {
//       provide: APOLLO_OPTIONS,
//       useFactory: createApollo,
//       deps: [HttpLink],
//     },
//   ],
// })
export class GraphQLModule { }
