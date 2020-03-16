import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';
import Article from './components/Article';

const query = `
query MyQuery {
  allArticles {
    title
    createdAt
    content
    cover {
      url
    }
    category {
      name
    }
  }
}
`;

export default class App extends Component {
  state = {
    data: null,
  }

  componentDidMount = () => {
    Axios.post(
      'https://graphql.datocms.com/',
      { query },
      {
        headers: {
          Authorization: 'Bearer 6138772c24e2df7d8971d1adeed11e',
        },
      }
    )
    .then( response => this.setState({ data: response.data.data }))
    .catch( error => { throw error; } );
  }

  render = () => {
    const { data } = this.state;

    if (data === null) {
      return (
        <View>
          <Text>
            Loading...
          </Text>
        </View>
      );
    }

    return (
      <View>
        {data.allArticles.map( (article, index) =>
        <Article  key={index}{...article}></Article> 
         
        )}
      </View>
    );
  }
}
