import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ElencoPost from './pages/ElencoPost';
import Post from './pages/Post';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog" exact component={ElencoPost} />
          <Route path="/blog/:postId" component={Post} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
