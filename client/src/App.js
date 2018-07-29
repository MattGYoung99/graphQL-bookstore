import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';


const client = new ApolloClient({
  uri: "http://localhost:4000/graphQL",
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Matts Book List</h1>
          <BookList/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
