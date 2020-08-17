import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import {client} from './config/client'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Home} from './pages/Home'
import {Movies} from './pages/Movies'
import {TVSeries} from './pages/TVSeries'
import {Details} from './pages/Details'
import {AddMovie} from './pages/AddMovie'
import {UpdateMovie} from './pages/UpdateMovie'
import {Favorites} from './pages/Favorites'
import {Nav} from './components/Nav'

function App() {
  
  const styles = {
    body: {
      paddingLeft: 200, 
      paddingTop: 50, 
      paddingBottom: 40,
      marginLeft: 0,
      backgroundSize: 'cover',
      overflow: 'hidden',
      backgroundImage: `url(https://wallpapercave.com/wp/wp3006052.jpg)`
    },
    wrapper: {
      marginRight:0, 
      minHeight:'100vh', 
      fontFamiliy: 'Roboto Condensed'
    }
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="row" style={styles.wrapper}>
          <div className="col-1">
            <Nav/>    
          </div>
          <div className="col" style={styles.body}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/movies" component={Movies} />
                <Route exact path="/tvseries" component={TVSeries} />
                <Route exact path="/addMovie" component={AddMovie} />
                <Route exact path="/favorites" component={Favorites} />
                <Route path="/tvseries/details/:id" component={Details} />
                <Route path="/movies/details/:id" component={Details} />
                <Route path="/movies/update/:id" component={UpdateMovie} />
              </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
