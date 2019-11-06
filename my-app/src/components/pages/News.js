import React, { Component } from 'react';
import NewsData from './item/newsdata';

class News extends React.Component {
/*
  componentDidMount() {
      fetch('https://newsapi.org/v2/everything?q=climate&apiKey=7f25e9ec7b7b4ac181855d9cd830bfab')
      .then(response => response.json())
      .then(news => this.setState({
        news:
          news.
      }){
        let news = data.results.map((info) => {
          return(
            <div key={info.articles}>
            </div>
          )
        })
        this.setState({news: news});
        console.log("state", this.state.news);
      })
  }

  render() {
    return (
      <div>
        //{this.state.news}
      </div>
    );
  }
  */
  render() {
    return (
      <div>
        <h2> News Page .. </h2>
      </div>
    );
  }
}

export default News;
