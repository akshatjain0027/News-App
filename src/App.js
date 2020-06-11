import React from 'react';
import Reflux from 'reflux';
import { Typography, Card, CardContent, Paper, Button, CircularProgress } from '@material-ui/core';
import './App.css';
import AppStore, { Actions } from './AppStore';

class App extends Reflux.Component {
  constructor(){
    super();
    this.state = {
      index: null
    }
    this.store = AppStore;
  }
  componentDidMount(){
    Actions.initStore();
  }
  openPaper = (index)=>{
    this.setState({
      isOpen: true,
      index: index
    })
  }
  closePaper = ()=>{
    this.setState({
      isOpen: false
    })
  }
  getArticlesDataLarge = (article)=>{
    return (
      <Paper elevation={10} style={{ width: "700px", height: "700px", position: "absolute", marginTop: "100px", opacity: "1"}}>
        <img src={article.urlToImage} style={{ width: "100%", height: "45%"}}/>
        <Typography variant="h4" style={{ padding: "10px"}}>
          {article.title}
        </Typography>
        <Typography variant="body1" style={{ padding: "20px"}}>
          {article.content}
        </Typography>
        <Button variant="contained" color="secondary" onClick={this.closePaper} style={{ margin: "20px"}}>
          Close
        </Button>
      </Paper>
    )
  }
  getArticlesData = () =>{
    const { articles } = this.state;
    return(
      articles.map((article, index) => {
        return(
        <Card style={{ width: "70%", margin: "20px", backgroundColor: "lavender"}} key={index} id={index} elevation={5}>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <img src={article.urlToImage} style={{ width: "35%"}}/>
              <div>
                  <Typography variant="h5" style={{ padding: "10px" }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" style={{ padding: "10px" }}>
                    {article.description}
                    {<Typography variant="caption" onClick={() => this.openPaper(index)}>
                      Show More
                    </Typography>}
                  </Typography>
                  
                  <Typography variant="caption" style={{ padding: "10px" }}>
                    {article.author}
                  </Typography>
              </div>
            </div>
           
          </CardContent>
        </Card>
      )})
    )
    
  }
  getCountries = () => {
    const { countries } = this.state;
    return (
      countries.map(country => {
        return (
          <Button variant="contained" color="primary" style={{ margin: "5px", width: "40%"}}>
            {country.Country}
          </Button>
        )
      })
    )
  }
  render(){
    const { GlobalData, articles, coronaDataLoading, newsLoading } = this.state;
    return (
      <div style={{ display: "flex", flexDirection: "row", backgroundColor: "aliceblue" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "35%" }}>
          <Typography variant="h3" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            Corona Data
          </Typography>
          <Button variant="contained" color="primary" style={{ margin: "5px", width: "40%"}}>
            Global
          </Button>
          {coronaDataLoading? <CircularProgress/> :this.getCountries()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "65%" }}>
          <Typography variant="h2" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            News
          </Typography>
          {newsLoading? <CircularProgress/> :this.getArticlesData()}
          {this.state.isOpen && this.getArticlesDataLarge(articles[this.state.index])}
        </div>
      </div>
      
    )
  }
}

export default App;
