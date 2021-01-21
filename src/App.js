
import React, {useEffect, useState} from "react";
import './App.css';
import Card from 'react-bootstrap/Card'
import CardDeck from "react-bootstrap/CardDeck"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form"
function App() {
  const[latest,setLatest]= useState("");
  const[results,setResults]=useState([]);
  const [searchCountry,setSearchCountry]=useState("");

  useEffect(() => {
    axios
    .all([
     axios.get ("https://corona.lmao.ninja/v3/covid-19/all"),
    axios.get("https://corona.lmao.ninja/v3/covid-19/countries")
  ])
    .then(responseArr=>{
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
    })
    .catch(err=>{
      console.log(err);
    });
  },[]);
  const date= new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const filterCountry= results.filter(item=>{
    return searchCountry !==""? item.country === searchCountry : item;
  });
  const countries = filterCountry.map((data,i)=>{
    return(
      <div class="container-fluid" class="card-horizontal" class="img-square-wrapper">
      
        <div className="container-fluid">
          <div className="row">
              <div className="col-12 mt-1">
                  <div className="card">
                  <div class="card-header">
                    {data.country}
                  </div>
                      <div className="card-horizontal">
                          <div className="img--wrapper">
                              <img className="flags" src={data.countryInfo.flag} alt="Card image cap"></img>
                          </div>
                      <div className="card-body">
                      
                        <p class="card-text">
                          <ul>
                            <li>Cases - {data.cases}</li>
                            <li>Deaths - {data.deaths}</li>
                            <li>recovered - {data.recovered}</li>
                            <li>Today's cases - {data.todayCases}</li>
                            <li>Today's death - {data.todayDeath}</li>
                            <li>Active - {data.active}</li>
                            <li>Critical - {data.critical}</li>
                          </ul>
                        </p>
                          </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
     
      </div>
    );
  });
  var queries = [{
    columns: 1,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];
  return (
    <div className="App">
     <CardDeck>
  <Card bg="secondary" text={"white"} classname="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>{latest.cases}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small >Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="danger" text={"white"} classname="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Death</Card.Title>
      <Card.Text>{latest.deaths}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="success" text={"white"} classname="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>{latest.recovered}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
</CardDeck>
<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Label>Search</Form.Label>
    <Form.Control type="text" placeholder="Search a country"
      onChange={e=>setSearchCountry(e.target.value)}
    />
  </Form.Group>
</Form>
<Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
