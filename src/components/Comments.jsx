import React, { Component } from 'react'
import md5 from 'md5'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'


class Comments extends Component {
  state = {
    isLoading: true,
  }
  
  async componentDidMount() {
    this.rebuildIndex()
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const gitalk = new Gitalk({
      clientID: process.env.GATSBY_GIT_CLIENT_ID,
      clientSecret: process.env.GATSBY_GIT_CLIENT_SECRET,
      repo: process.env.GATSBY_GIT_REPO,
      owner: process.env.GATSBY_GIT_OWNER,
      admin: process.env.GATSBY_GIT_OWNER,
      id: md5(this.props.path),      // Ensure uniqueness and length less than 50
      distractionFreeMode: false,  // Facebook-like distraction free mode
      perPage: 5,

    })
    gitalk.render("gitalk-container")
    this.setState({ isLoading: false })
  }

  render() {
    return (
      <div id="gitalk-container"></div>
    )
  };
}

export default Comments

