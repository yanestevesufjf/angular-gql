import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, from ,InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { onError } from "@apollo/client/link/error";

const uri = 'https://localhost:7171/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log(`[GraphQL errors]`);
    console.log(graphQLErrors)
   
    if (networkError) {
      console.log(`[Network error]`);
      console.log(networkError);
    }
  });

  return {
    link: from([
      errorLink,
      httpLink.create({ uri })
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
export class GraphQLModule {}
