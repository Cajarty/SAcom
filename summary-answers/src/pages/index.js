import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const GET_GOOGLE_SEARCH_URL = (searchQuery) => {
  // Alternative:
  let request = "http://api.search.yahoo.com/WebSearchService/V1/webSearch?appid=YahooDemo&query=umbrella&results=10";
  return 'http://www.google.com/search?q=' + searchQuery + '&btnI';
};

const formatGoogleSearch = (searchText) => {
  return searchText.replace(' ', '+');
}

const PRIV_SMMRY_KEY = '';
const SUMMRY_API_BASE_URL = 'http://api.smmry.com/&SM_API_KEY=' + PRIV_SMMRY_KEY + '&SM_URL=';

const GET_SMMRY_REQUEST_API = (searchText) => {
  let searchQuery = formatGoogleSearch(searchText);
  let url = GET_GOOGLE_SEARCH_URL(searchQuery);
  let summryFullURL = SUMMRY_API_BASE_URL + url;
  return summryFullURL;
};


class Results extends React.Component {
  render() {
    return (<div></div>);
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchValue: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.searchValue);
    event.preventDefault();
  }

  render() {
    return (
      <form className='searchBarContainer' onSubmit={this.handleSubmit}>
        <label>
          Search for a Summary:
          <br/>
          <input className='searchBar' type="text" value={this.state.searchValue} onChange={this.handleChange} />
        </label>
        <br/>
        <input type="submit" value="Submit" />
        <Results/>
      </form>
    );
  }
}

const IndexPage = () => (
  <Layout>
    <SEO title="Summary Search Home" />
    <SearchBar/>
  </Layout>
)

export default IndexPage
