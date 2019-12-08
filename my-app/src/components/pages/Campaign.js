import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import "../../campaign.css";

const cookies = new Cookies();



export default class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      likes: [],
      moveToAdd: false
    };
  }

  componentDidMount() {
    fetch("http://frank.colab.duke.edu:3002/api/v1/campaign", {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(data =>
          // this.setState({
          //   isLoaded: true,
          //   data: data.data
          // })
          console.log(JSON.stringify(data))
        )
      .catch(err => {
        this.setState({
          isLoaded: true,
          error: err
        })
      })
      
    const testCampaigns = [
      {
        id: 1,
        name: "Test Campaign 1",
        description: "This is a test campaign",
        goal: 1000,
        paylink: "https://www.google.com"
      },
      {
        id: 2,
        name: "Test Campaign 2",
        description: "This is another test campaign",
        goal: 500,
        paylink: "https://www.youtube.com"
      },
      {
        id: 3,
        name: "Test Campaign 2",
        description: "This is another test campaign",
        goal: 500,
        paylink: "https://www.youtube.com"
      },
      {
        id: 4,
        name: "Test Campaign 2",
        description: "This is another test campaign",
        goal: 500,
        paylink: "https://www.youtube.com"
      }
    ]

    const likes = [1, 4];

    this.setState({
      data: testCampaigns,
      isLoaded: true,
      likes
    });
  }

  clickLike(id) {
    let likes = this.state.likes;
    const index = likes.indexOf(id);
    if (index > -1) {
      likes.splice(index, 1);
    } else {
      likes.push(id);
    }

    this.setState({
      likes
    });
  }

  handleAddButtonClick() {
    console.log("button is clicked");
    this.setState({
      moveToAdd: true
    })
  }

  render() {
    if(this.state.moveToAdd) return <Redirect to="/addcampaign" />;
    const { error, isLoaded, data, likes } = this.state;
    // console.log(data);
    // console.log(likes);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <div style={{ width: "100%" }}>
            {data != null ? (
              data.map(campaign => (
                <div key={campaign.id} className="campaign-card">
                  <h1>{campaign.name}</h1>
                  <div className="campaign-card-text">
                    <h2>{campaign.description}</h2>
                  </div>
                  <div
                    onClick={() => {
                      this.clickLike(campaign.id);
                    }}
                    className="campaign-card-like"
                  >
                    {likes.indexOf(campaign.id) > -1 ? (
                      <div className="campaign-card-liked">
                        <i class="fa fa-thumbs-up"></i>
                      </div>
                    ) : (
                      <div>
                        <i class="fa fa-thumbs-up"></i>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>There is No Data</div>
            )}
            <div className="button-container">
              <div style={{ margin: "auto", width: "60px", height: "60px" }}>
                <button
                  style={{
                    outline: "none",
                    borderRadius: "50%",
                    color: "#2191FB",
                    height: "100%",
                    width: "100%"
                  }}
                  onClick={() => this.handleAddButtonClick()}
                >
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
