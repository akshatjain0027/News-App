import Reflux from 'reflux';
import { data } from './Data';

export const Actions = Reflux.createActions([
    "initStore"
]);

class AppStore extends Reflux.Store{
    constructor(){
        super();
        this.state = {
            GlobalData: {},
            countries: [],
            newsData: data,
            articles: [],
            isOpen: false,
            coronaDataLoading: true,
            newsLoading: true
        }
        this.listenables = Actions;
    }
    
    onInitStore(){
        this.setState({ GlobalData: {} })
        this.fetchCoronaData();
        this.fetchTopHeadlinesIndia();
    }

    fetchCoronaData(){
        fetch("http://localhost:8000/covid19").then((response => response.json())).then(data => this.setState({ GlobalData: data.Global, countries: data.Countries, coronaDataLoading: false }))
    }

    fetchTopHeadlinesIndia(){
        fetch("http://localhost:8000/topheadlines").then(response => response.json()).then(news => this.setState({ articles: news.articles, newsLoading: false }))
    }
}

export default AppStore;