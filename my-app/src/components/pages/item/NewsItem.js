import React from 'react';


class NewsItem extends React.Component {
    render() {
        const title = this.props.title;
        const url = this.props.url;
        const imageUrl = this.props.imageUrl;
        
        return (
            <div className="newsItem">
                <div>
                    <h1>
                        <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                    </h1>
                    <div id="image-container">
                        <img src={imageUrl} alt={imageUrl} />
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;