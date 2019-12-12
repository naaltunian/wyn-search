import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    fetchOptions: {
        credentials: "include"
    },
    request: operatation => {
        const token = localStorage.getItem('token');
        operatation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}`: ""
            }
        })
    },
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
