// src/components/contacts.js

import React from 'react'

const NewsData = ({ newsdata }) => {
  return (
    <div>
      <center><h1>Article List</h1></center>
      {newsdata.map((data) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{data.articles.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{data.articles.author}</h6>
            <p class="card-text">{data.articles.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default NewsData
