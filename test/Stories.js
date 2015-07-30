var React = require('react')

async function fetchStories(subreddit) {
  var req = await window.fetch(`https://www.reddit.com/r/${subreddit}.json`, {mode: 'cors'})
  var json = await req.json()
  return json
}

var SUBREDDITS = ['javascript', 'programming', 'deepdream']

var Stories = React.createClass({
  getInitialState() {
    return {
      loading: false,
      stories: [],
      subreddit: 'javascript'
    }
  },

  componentDidMount() {
    this.updateStories()
  },

  async updateStories() {
    var loadingTimeout = setTimeout(() => {
      this.setState({loading: true})
      loadingTimeout = null
    }, 333)

    try {
      var data = await fetchStories(this.state.subreddit)
      this.setState({stories: data.data.children.map(child => child.data)})
    }
    catch (e) {
      // pass
    }

    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
    }
    else {
      this.setState({loading: false})
    }
  },

  handleChange(e) {
    var subreddit = e.target.value
    this.setState({subreddit}, this.updateStories)
  },

  render() {
    return <div className="Stories">
      <h2>
        <select disabled={this.state.loading} value={this.state.subreddit} onChange={this.handleChange}>
          {SUBREDDITS.map(subreddit => <option key={subreddit}>{subreddit}</option>)}
        </select>{' '}
        Stories
      </h2>
      {this.state.loading && <h3>Loading...</h3>}
      <ol style={{opacity: this.state.loading ? '.5' : '1'}}>
        {this.state.stories.map(story => <li key={story.id}>{story.title}</li>)}
      </ol>
    </div>
  }
})

module.exports = Stories
