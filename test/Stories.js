var React = require('react')

async function fetchStories(subreddit) {
  var req = await window.fetch(`https://www.reddit.com/r/${subreddit}.json`, {mode: 'cors'})
  var json = await req.json()
  return json
}

var Stories = React.createClass({
  getInitialState() {
    return {
      loading: false,
      stories: []
    }
  },
  componentDidMount() {
    this.updateStories()
  },
  async updateStories() {
    this.setState({loading: true})
    try {
      var data = await fetchStories('javascript')
      this.setState({stories: data.data.children.map(child => child.data)})
    }
    catch (e) {
      // pass
    }
    this.setState({loading: false})
  },
  render() {
    return <div className="Stories">
      <h2>Stories</h2>
      {this.state.loading && <h3>Loading...</h3>}
      <ul>
        {this.state.stories.map(story => <li key={story.id}>{story.title}</li>)}
      </ul>
    </div>
  }
})

module.exports = Stories
