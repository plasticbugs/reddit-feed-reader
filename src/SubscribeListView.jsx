import React from 'react';

class SubscribeListView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if(this.props.subscriptions.length > 0) {
      return (
        <section className="subreddits">
          <h2 className="list-header">Subreddit Feeds</h2>
          <ul className="sub-list">{this.props.subscriptions.map(sub => {
            return (<li key={sub}>
                      <span className="subreddit-name">
                        {sub}
                      </span>
                      <a href="#" onClick={()=>{this.props.removeSub(sub)}}>
                        <span className="delete-button">delete</span>
                      </a>
                    </li>
            );
          })}</ul>
        </section>
      )
    } else {
      return null;
    }
  }
}

module.exports = SubscribeListView;