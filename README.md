# Reddit Feed Reader

## Specification:
Create an application that aggregates Reddit subreddits utilizing the Reddit API. The feed reader should display 'news' as the default subreddit if no subreddits have been added. The user should be able to add and remove subreddits. The app should update the list of posts as subreddits are added and removed.

## How to run this application:

You can either open the `dist/index.html` file in your browser or run the application via `serve` by following this short guide:

1. To build the application from the source files, you will need Yarn and Node.js installed:

`brew install yarn`

2. Navigate to the project root and run `yarn` to install all the project's dependencies.

3. Build the uglified JS and minified CSS and start the server by running:

`yarn start`

4. Visit `http://localhost:3000/` in your browser to use the application.

## Solution:
I created a React-based application to handle the state of the application and display the list of subreddits and posts.

The user has the option of sorting the results by score, submission time or comment count.

I also configured a build system to compile/transpile and minify the JS/JSX and CSS.

## How to use this application:
When the page loads, the application displays posts from the 'news' subreddit. If the user enters a valid subreddit into the input field and submits it, the application will update to display that subreddit. The default posts are removed.

As new subreddits are added, the additional posts are integrated based on the currently selected sort order.

As this is a client-only application, the user's saved subreddits will not persist after the browser is refreshed or the page is navigated away.
