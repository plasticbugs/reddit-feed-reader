import React from 'react';
import Select from 'react-select';
import javascriptTimeAgo from 'javascript-time-ago';
javascriptTimeAgo.locale(require('javascript-time-ago/locales/en'));

const SORTED_NAMES = {
  created: 'newest first',
  score: 'total score',
  num_comments: 'number of comments'
}

var selectOptions = [];
for(let key in SORTED_NAMES) {
  selectOptions.push({
    value: key,
    label: SORTED_NAMES[key]
  })
}

const timeAgo = new javascriptTimeAgo('en-US');

class FeedView extends React.Component {
  constructor(props) {
    super(props);
    this.changeSortOrder = this.changeSortOrder.bind(this);
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

  changeSortOrder(option) {
    this.props.changeSortOrder(option.value);
  }

  render() {
    return (
      <div className="feed-view">
        <div className="sort-order">
          <span>Sort by</span> <Select
            value={this.props.sortOrder}
            options={selectOptions}
            onChange={this.changeSortOrder}
            clearable={false}
          />
        </div>
        <ul>
        {this.props.articles.map(post => {
            return (
              <li key={post.id} className="post">
                <div className="post-score">{post.score}</div>
                {this.renderImage(post)}
                <div className="post-info">
                  <a href={post.url}>{post.title}</a>
                  <div className="post-details">
                    <p>Submitted {timeAgo.format(new Date(post.created_utc * 1000 ))} by <a href={`https://www.reddit.com/user/${post.author}`}>{post.author}</a> to <a href={`https://reddit.com/${post.subreddit_name_prefixed}`}>{post.subreddit_name_prefixed}</a></p>
                    <p><a href={`https://reddit.com${post.permalink}`}>{post.num_comments} comments</a></p>
                    
                  </div>
                </div>
              </li>
            );
          });
        }
        </ul>
      </div>
    );
  }
}

module.exports = FeedView;