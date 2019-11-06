import React, { Component } from 'react';
import NewsData from './item/newsdata';

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
    fetch("https://newsapi.org/v2/everything?q=climate&apiKey=7f25e9ec7b7b4ac181855d9cd830bfab")
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ul>
            {articles.map(article => (
              <li key={article.title}>
                <ul>
                  <li>
                    {article.title}
                  </li>
                  <li>
                    {article.url}
                  </li>
                  <li>
                    <img height="250" width="500" src ={article.urlToImage} />
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default News;
