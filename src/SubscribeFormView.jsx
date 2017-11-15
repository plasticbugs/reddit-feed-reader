import React from 'react';

class SubscribeFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ inputField: e.target.value});    
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if(this.state.inputField.length > 0) {
      this.props.addNewSubreddit(this.state.inputField);
      this.setState({inputField: ''});
    }
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input className="search-field" type="text" placeholder="Enter a subreddit name" value={this.state.inputField} onChange={this.handleInputChange} />
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    );
  }
};

module.exports = SubscribeFormView;