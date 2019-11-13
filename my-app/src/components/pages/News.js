import React, { Component } from 'react';
import NewsItem from './item/NewsItem'

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("https://newsapi.org/v2/everything?q=climate&pageSize=48&apiKey=7f25e9ec7b7b4ac181855d9cd830bfab")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            articles: result.articles
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <div>
            <div><h2>News</h2></div>
            <div className="newsItems">
              {articles.map(article => (
                <NewsItem title={article.title} url={article.url} imageUrl={article.urlToImage}/>
              ))}
            </div>
          </div>
      );
    }
  }
}

export default News;
