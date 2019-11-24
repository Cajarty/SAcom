const express  = require( 'express')
const cors  = require( 'cors')


const GET_GOOGLE_SEARCH_URL = (searchQuery) => {
    // Alternative:
    let request = "http://api.search.yahoo.com/WebSearchService/V1/webSearch?appid=YahooDemo&query=umbrella&results=10";
    return 'http://www.google.com/search?q=' + searchQuery + '&btnI';
};

const formatGoogleSearch = (searchText) => {
    return searchText.replace(' ', '+');
}

const PRIV_SMMRY_KEY = '2EBC123DB5';
const SUMMRY_API_BASE_URL = 'http://api.smmry.com/&SM_API_KEY=' + PRIV_SMMRY_KEY + '&SM_URL=';


let app = express()
app.use(cors())

let corsOptions = {
    origin: SUMMRY_API_BASE_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const GET_SMMRY_URL_PART = (searchText) => {
    let searchQuery = formatGoogleSearch(searchText);
    let url = GET_GOOGLE_SEARCH_URL(searchQuery);
    return url;
};


const Summarize = function(searchText, callback) {
    app.get(GET_SMMRY_URL_PART(searchText), cors(corsOptions), (req, res, next) => {
        res.json({msg: 'This is CORS-enabled for only example.com.'})
        callback(res);
        // res.json({msg: 'This is CORS-enabled for all origins!'})
    });
}

export default Summarize;