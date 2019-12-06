import React, { Component } from 'react';
import "../../campaign.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      likes: []
    };
  }

  componentDidMount() {
    // fetch("http://frank.colab.duke.edu:3002/api/v1/campaign/")
    //   .then(res => res.json())
    //   .then(data =>
    //       this.setState({
    //         isLoaded: true,
    //         data: data.data
    //       }))
    //   .catch(err => {
    //     this.setState({
    //       isLoaded: true,
    //       error: err
    //     })
    //   })
    const testCampaigns = [{id: 1, name: "Test Campaign 1", description: "This is a test campaign", goal: 1000, paylink: "https://www.google.com"},
            {id: 2, name: "Test Campaign 2", description: "This is another test campaign", goal: 500, paylink: "https://www.youtube.com"},
            {id: 3, name: "Test Campaign 2", description: "This is another test campaign", goal: 500, paylink: "https://www.youtube.com"},
            {id: 4, name: "Test Campaign 2", description: "This is another test campaign", goal: 500, paylink: "https://www.youtube.com"}]
    
    const likes = [1,4]

    this.setState({
      data: testCampaigns,
      isLoaded: true,
      likes
    })
  }

  clickLike(id) {
    let likes = this.state.likes;
    const index = likes.indexOf(id);
    if(index > -1) {
      likes.splice(index, 1);
    } else {
      likes.push(id);
    }

    this.setState({
      likes
    })
  }

  render() {
    const { error, isLoaded, data, likes } = this.state;
    console.log(data);
    console.log(likes);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <div style={{width: "100%"}}>
            {data != null ? data.map((campaign)=> (
              <div className="campaign-card">
                <h1>{campaign.name}</h1>
                <div className="campaign-card-text">
                  <h2>{campaign.description}</h2>
                </div>
                <div onClick={() => {this.clickLike(campaign.id)} } className="campaign-card-like" >
                  {likes.indexOf(campaign.id) > -1 ? 
                    <div className="campaign-card-liked">
                      <i class="fa fa-thumbs-up"></i>
                    </div> :
                    <div>
                      <i class="fa fa-thumbs-up"></i>
                    </div>  
                  }
                </div>
              </div>
            )) : <div>There is No Data</div>}
          </div>
        </div>
      );
    }
  }
}