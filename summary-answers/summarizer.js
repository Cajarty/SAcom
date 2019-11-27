import axios from "axios";
const followRedirect = require('follow-redirect-url');

let httpsProxyAgent = require('https-proxy-agent');
var agent = new httpsProxyAgent('http://localhost:8124');

const GET_GOOGLE_SEARCH_URL = (searchQuery) => {
    // Alternatives:
    //let request = "http://api.search.yahoo.com/WebSearchService/V1/webSearch?appid=YahooDemo&query=umbrella&results=10";
    //return 'http://www.google.com/search?q=' + searchQuery + '&btnI';
    return 'https://duckduckgo.com/?q=!ducky+' + searchQuery;
};

const getSearchURL = (searchQuery, callback) => {
    followRedirect.startFollowing(GET_GOOGLE_SEARCH_URL(searchQuery)).then(urls => {
        console.info(urls);
        callback(urls[0]);
    }).catch(error => {
        console.info(error)
    })
    // http.get(GET_GOOGLE_SEARCH_URL(searchQuery), response => {
    //     response.on('data', chunk => {
    //         console.log(chunk);
    //         //callback(chunk);
    //     });
    // }).on('error', err => {
    //     console.error(err);
    // });
}

const formatGoogleSearch = (searchText) => {
    return searchText.replace(' ', '+');
}

const PRIV_SMMRY_KEY = '2EBC123DB5';
const SUMMRY_API_BASE_URL = 'http://api.smmry.com/&SM_API_KEY=' + PRIV_SMMRY_KEY + '&SM_URL=';

const GET_SMMRY_URL_PART = (searchText, callback) => {
    let searchQuery = formatGoogleSearch(searchText);
    getSearchURL(searchQuery, (url) => {
        return callback(url);
    });
};

const Summarize = function (searchText, callback) {
    GET_SMMRY_URL_PART(searchText, (url) => {
        axios.get({
            url,
            httpsAgent: agent,
        }).then((res) => {
            console.info(url, res);
            //callback(res);
        });
    });
}

export default Summarize;