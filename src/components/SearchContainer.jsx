import React, { Component } from "react"
import Axios from "axios"
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import * as JsSearch from "js-search"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far)

const SearchWrapper = styled.div`
    width:100%;
    padding: 12px;
    font-size: 14px;
    align-items: center;
    text-align: center;
    form {
        position: relative;
        width: 220px;
        margin: 0;
        height: 42px;
    }
    input, .button {
        border: none;
        outline: none;
    }
    input {
        width: 100%;
        height: 42px;
        padding-left: 10px;
        width: 0;
        color: ${props => props.theme.colors.white.light};
        padding: 0 32px 0 10px;
        border-box: 1px solid transparent;
        background: transparent;
        transition: .3s linear;
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        z-index: 2;
        &:focus {
            width: 220px;
            z-index: 1;
            border-bottom: 1px solid ${props => props.theme.colors.white.grey};;
        }
    }
    .button {
        height: 42px;
        width: 42px;
        padding: 10px;
        color: ${props => props.theme.colors.white.grey};
        text-align: center;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
    } 
    .searchVal{
        padding: 0;
        display: none;
        width: 300px;
        height: 400px;
        overflow: auto;
    }    
    .display{
        display: block;
    }
    .none{
        display: none;
    }
    .searchVal li a{
        text-align: left;
        display: block;
        padding: 0.5rem;
        text-decoration: none;
    }
    .searchVal li:hover > ul{
        display: block;
        margin: 0;
    }
    .searchVal li:hover{
        background: ${props => props.theme.colors.linearColor.navbarbg};
    }
    .searchVal li:hover a{
        color: ${props => props.theme.colors.white.light};
    }
    .searchVal li:hover{
        color: ${props => props.theme.colors.white.grey};
    }
    .searchVal ul{
        background: ${props => props.theme.colors.linearColor.navbarbg};
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        position:absolute;
        top:100%;
        padding:0;
    }
    .searchVal ul li{
        float:none;
        border-top:1px solid ${props => props.theme.colors.black.light};
    }
    .searchVal ul li a:hover{
        color: ${props => props.theme.colors.white.grey};
        background: #4b545f;
    }
    .searchVal ul ul{
        width:100%;
        position:absolute;
        left:100%;
        top:50%;
    }
    .searchVal a {
        color: ${props => props.theme.colors.white.grey};
        padding: 1rem;
        transition: all ${props => props.theme.transitions.default.duration};
        &:hover {
        color: ${props => props.theme.colors.white.light};
        }
    }
`;

const Panel = styled.div`
    padding: 0;
    
`;

class Search extends Component {
  state = {
    bookList: [],
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: "",
    display: "none",
  }
  /**
   * React lifecycle method to fetch the data
   */
  async componentDidMount() {
    Axios.get("https://bvaughn.github.io/js-search/books.json")
      .then(result => {
        const bookData = result.data
        this.setState({ bookList: bookData.books })
        this.rebuildIndex()
      })
      .catch(err => {
        this.setState({ isError: true })
        console.log("====================================")
        console.log(`Something bad happened while fetching the data\n${err}`)
        console.log("====================================")
      })
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const { bookList } = this.state
    const dataToSearch = new JsSearch.Search("isbn")
    /**
     *  defines a indexing strategy for the data
     * more more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("isbn")

    dataToSearch.addIndex("title") // sets the index attribute for the data
    dataToSearch.addIndex("author") // sets the index attribute for the data

    dataToSearch.addDocuments(bookList) // adds the data to be searched
    this.setState({ search: dataToSearch, isLoading: false, active:"none" })
  }

  /**
   * handles the input change and perfom a search with js-search
   * in which the results will be added to the state
   */
  searchData = e => {
    const { search } = this.state
    const queryResult = search.search(e.target.value)
    const actived = "actived";
    this.setState({ searchQuery: e.target.value, searchResults: queryResult, active: actived })
  }
  handleSubmit = e => {
    e.preventDefault()
  }

  display = ()=> {
    if (this.state.display == 'none') {
        this.setState({
            display: 'display',
        })
    }
    else if (this.state.display == 'display') {
        this.setState({
            display: 'none',
        })

    }
  }

  render() {
       
    const { bookList, searchResults, searchQuery } = this.state
    const queryResults = searchQuery === "" ? bookList : searchResults
    return (
      <SearchWrapper>
            <form className="" onSubmit={this.handleSubmit} >
                <input 
                id="Search"
                value={searchQuery}
                onChange={this.searchData}
                onFocus={this.display}
                onBlur={this.display}
                placeholder="搜索关键字"
                />
                <div className="button" ><FontAwesomeIcon icon={['fas', 'search']} size="1x" /></div>
            </form>
            <ul className={`searchVal ${this.state.display}`} >
            {queryResults && queryResults.map(item => {
                return (
                    <li key={`row_${item.isbn}`}>
                        <Link to="/">{item.title}</Link>
                    </li>
                )
            })}
            </ul>
      </SearchWrapper>
    )
  }
}
export default Search