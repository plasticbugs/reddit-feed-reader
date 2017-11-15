import React from 'react';
import FeedView from './FeedView.jsx';
import axios from 'axios';
import SubscribeFormView from './SubscribeFormView.jsx';
import SubscribeListView from './SubscribeListView.jsx';

class FeedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      articles: [],
      flash: null,
      sortOrder: 'score'
    };
    this.addNewSubreddit = this.addNewSubreddit.bind(this);
    this.removeSubreddit = this.removeSubreddit.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
  }

  componentDidMount() {
    this.loadDefault('news');
  }

  changeSortOrder(order) {
    let postCopy = this.state.articles.slice();
    postCopy.sort((a,b) => {
      return b[order] - a[order]
    })
    this.setState({sortOrder: order, articles: postCopy});
  }

  getPostsForSub(subreddit) {
    return new Promise((resolve, reject) => {
      axios.get('https://www.reddit.com/r/' + subreddit + '/hot.json', {
        params: {
          raw_json: 1
        }
      } )
      .then(results => {
        let formattedResults = results.data.data.children.map( element => {
          return element.data;
        });
        resolve(formattedResults);
      })
      .catch(err => {
        reject(err);
      })
    })
  }

  addNewSubreddit(subreddit) {
    this.setState({flash: null});

    if(this.state.subscriptions.length === 0 && subreddit !== 'news') {
      this.setState({articles: []})
    }
    if(this.state.subscriptions.indexOf(subreddit) > -1 || 
        (this.state.subscriptions.length === 0 && subreddit === 'news' && this.state.articles.length !== 0)) {
      this.setState({flash: 'That subreddit has already been added'})
    } else {
      this.getPostsForSub(subreddit)
      .then(posts => {
        console.log(posts);
        let allPosts = this.state.articles.slice();
        let allSubs = this.state.subscriptions.slice();
        allPosts = allPosts.concat(posts);
        allPosts.sort((a,b) => {
          return b[this.state.sortOrder] - a[this.state.sortOrder];
        })
        allSubs.push(subreddit);
        this.setState({articles: allPosts, subscriptions: allSubs});
      })
      .catch(err => {
        if(this.state.subscriptions.length === 0) {
          this.loadDefault('news');          
        }
        console.log(err);
        this.setState({flash: 'There was an error adding that subreddit'})
      })
    }
  }

  removeSubreddit(subreddit) {
    let subs = this.state.subscriptions;
    let index = subs.indexOf(subreddit);
    let subsCopy = subs.slice(0, index).concat(subs.slice(index+1, subs.length));
    
    let postsCopy = [];
    for(let i = 0; i < this.state.articles.length; i++) {
      if(this.state.articles[i].subreddit !== subreddit) {
        console.log(this.state.articles[i].subreddit, subreddit)
        postsCopy.push(this.state.articles[i]);
      }
    }
    this.setState({articles: postsCopy, subscriptions: subsCopy}, ()=> {
      if(postsCopy.length === 0) {
        this.loadDefault('news');
      }
    });
  }

  loadDefault(subreddit){
    this.getPostsForSub(subreddit)
    .then(posts => {
      this.setState({articles: posts, flash: 'Showing default subreddit'});
    })
  }

  showFlash() {
    return <div className="flash-message">{this.state.flash}</div>
  }

  render() {
    let flashMessage;
    if(this.state.flash) {
      flashMessage = this.showFlash();
    }
    return (
      <div className="container">
        <div className="sidebar">
          < SubscribeFormView addNewSubreddit={this.addNewSubreddit} />
          {flashMessage}
          < SubscribeListView 
            subscriptions={this.state.subscriptions} 
            removeSub={this.removeSubreddit} 
          />
        </div>
        < FeedView {...this.state} changeSortOrder={this.changeSortOrder}/>
      </div>
    );
  }
}

module.exports = FeedContainer;