import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Summarizer from "../../summarizer";

class Results extends React.Component {
  render() {
    return (<iframe src={this.props.webResult}>
    </iframe>);
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleSubmit(event) {
    Summarizer(this.state.searchValue, (t) => {
      console.info(t, t.data);
      this.setState({
        webResult: t.data,
      })
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className='searchBarContainer'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for a Summary:
          <br />
            <input className='searchBar' type="text" value={this.state.searchValue} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <Results webResult={this.state.webResult} />
      </div>
    );
  }
}

const IndexPage = () => (
  <Layout>
    <SEO title="Summary Search Home" />
    <SearchBar />
  </Layout>
)

export default IndexPage
