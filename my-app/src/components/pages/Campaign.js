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
      moveToAdd: false,
      loggedIn: false
    };
  }

  async componentDidMount() {
    await fetch("https://frank.colab.duke.edu:3002/api/v1/campaign/get", {
      method: "GET",
      mode: "cors",
  })
      .then(res => res.json())
      .then(data =>
          this.setState({
            isLoaded: true,
            data: data
          })
        )
      .catch(err => {
        console.log(err);
        this.setState({
          isLoaded: true,
          error: err
        })
      })
    
    const username = cookies.get("climateAction");
    if(username) {
      this.setState({
        loggedIn: true,
        username
      })
    }
  }

  clickLike(id) {
    let likes = this.state.likes;
    const index = likes.indexOf(id);
    if(!this.state.loggedIn) return;
    if (index > -1) {
      this.removeLike(id);
    } else {
      this.addLike(id);
    }

    this.setState({
      likes
    });
  }

  removeLike(id) {
    return;
  }

  async addLike(id) {
    const values = {CID: id, username: this.state.username}
    try {
      await fetch("http://frank.colab.duke.edu:3002/api/v1/campaign", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(values),
          headers: {
              "Content-Type": "application/json"
          }
      })
    } catch (e) {
        console.error(e)
    }
  }

  async getLikes() {
    let likes;
    if(this.state.username) {
      await fetch(`https://frank.colab.duke.edu:3002/api/v1/likes/user?username=${this.state.username}`)
      .then(res => res.json())
      .then(data => 
        likes = data)    } else {
      likes = [];
    }    
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
                <div key={campaign.cid} className="campaign-card">
                  <h1>{campaign.name}</h1>
                  <div className="campaign-card-text">
                    <h2>{campaign.description}</h2>
                  </div>
                  <div
                    onClick={() => {
                      console.log(campaign);
                      this.clickLike(campaign.cid);
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
              <div style={{margin: "110px 0", display: "inline-block", width: "60px", height: "60px" }}>
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
