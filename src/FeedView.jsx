import React from 'react';
import Select from 'react-select';

import PostView from './PostView.jsx';

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

class FeedView extends React.Component {
  constructor(props) {
    super(props);
    this.changeSortOrder = this.changeSortOrder.bind(this);
  }

  changeSortOrder(option) {
    this.props.changeSortOrder(option.value);
  }

  renderPost(post) {
    return < PostView post={post} key={post.id} />;
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
        {this.props.posts.map(post => {
            return this.renderPost(post);
          })
        }
        </ul>
      </div>
    );
  }
};

module.exports = FeedView;