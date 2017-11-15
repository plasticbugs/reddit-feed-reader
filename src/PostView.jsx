import React from 'react';
import javascriptTimeAgo from 'javascript-time-ago';

javascriptTimeAgo.locale(require('javascript-time-ago/locales/en'));
const timeAgo = new javascriptTimeAgo('en-US');

class PostView extends React.Component {
  constructor(props) {
    super(props);
  }

  renderImage(post) {
    let image;
    if(post.thumbnail && post.thumbnail.length > 7) {
      image = <img className="thumbnail" src={post.thumbnail} />;
    } else {
      image = <img className="thumbnail" src="./images/default.png" />;
    }
    return image;
  }

  render() {
    return (
      <li className="post">
        <div className="post-score">{this.props.post.score}</div>
        {this.renderImage(this.props.post)}
        <div className="post-info">
          <a href={this.props.post.url}>{this.props.post.title}</a>
          <div className="post-details">
            <p>
              {`Submitted ${timeAgo.format(new Date(this.props.post.created_utc * 1000 ))} by `}
              <a href={`https://www.reddit.com/user/${this.props.post.author}`}> 
                {this.props.post.author}
              </a> to <a href={`https://reddit.com/${this.props.post.subreddit_name_prefixed}`}>
                {this.props.post.subreddit_name_prefixed}
              </a>
            </p>
            <p>
              <a href={`https://reddit.com${this.props.post.permalink}`}>
                {this.props.post.num_comments} comments
              </a>
            </p>
          </div>
        </div>
      </li>
    );
  }
};

module.exports = PostView;