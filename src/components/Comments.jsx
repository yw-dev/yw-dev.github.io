import React, { Component } from 'react'
import styled from '@emotion/styled';
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
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
      clientID: '62e776a580c45d79929e',
      clientSecret: 'd68ef6f43f011fb96d4d0cb34165eab3ad706171',
      repo: ' https://yw-dev.github.io',
      owner: '1775216@gmail.com',
      admin: ['1775216@gmail.com'],
      id: this.props.path,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
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

export default Comments;

