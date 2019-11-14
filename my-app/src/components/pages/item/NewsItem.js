import React from 'react';


class NewsItem extends React.Component {
    render() {
        const title = this.props.title;
        const url = this.props.url;
        const imageUrl = this.props.imageUrl;
        
        return (
            <div className="newsItem">
                <a href={url} target="_blank" rel="noopener noreferrer">
                <div>
                    <h1>
                        {title}
                    </h1>
                    <div id="image-container">
                        <img src={imageUrl} alt={imageUrl} />
                    </div>
                </div>
                </a>
            </div>
        )
    }
}

export default NewsItem;