import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import Home from './components/home/Home'
import Game from './components/snake/Game'
import Me from './components/me/Me'

import MyMap from './components/MyMap'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Navbar, Nav, Container, Col, Row, Button } from 'react-bootstrap'

import './App.scss'

const startingState =
{
  mapToggledOn: false,
  coordsReady: false,
  lat: 0,
  lng: 0,
}

class App extends React.Component
{
  toggle = "On"

  state = startingState

  componentDidMount()
  {
    navigator.geolocation.getCurrentPosition((position) =>
    {
      // Get browser location
      this.setState(
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        coordsReady: true
      });
    });
  }

  toggleMap = () =>
  {
    const toggleMap = !this.state.mapToggledOn
    this.setState(
    {
      mapToggledOn: toggleMap
    })

    if (toggleMap)
      this.toggle = "Off"
    else
      this.toggle = "On"
  }

  render()
  {
    return (
      // The Outer div, since the return function only exports one parent element
      <div>
        {
        /*
         * Everything that is going to be visible at all times must go in the App.js file
         * E.G. In facebook, the Navbar at the top, or the friends list on the right
         *
         * The components just co-exist with everything in here, so the can be considered
         * as additions to the DOM, not a way to manipulate it.
         *
         * Only the App.js can actually manipulate the DOM, everything else can only read the
         * lifecycle hooks produced by those actions.
         */
        }

        <Router>
          <Navbar expand="lg" variant="dark" bg="dark">
            <Container fluid="true">
              <Row>
                <Col md={2} sm={2} xs={2}>
                  <Navbar.Brand>Our Awesome Site</Navbar.Brand>
                </Col>

                <Col md={6} sm={4} xs={2}>

                </Col>

                <Col md={4} sm={6} xs={8}>
                  <Nav className="mr-auto">
                    <Nav.Link>
                      <Link to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/login">Login</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/register">Register</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/me">Profile</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/egg">Snake</Link>
                    </Nav.Link>
                  </Nav>
                </Col>
              </Row>
            </Container>
          </Navbar>


          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <SignUp />
            </Route>
            <Route path="/me">
              <Me />
            </Route>
            <Route path="/egg">
              <Game />
            </Route>
          </Switch>

        </Router>

        {this.state.mapToggledOn ? 
          <div className="map">
            <MyMap coords={[this.state.lat, this.state.lng]}/>
          </div>
          : null
        }
        <div className="MapButton">
          <Button onClick={this.toggleMap}>
            Toggle Map {this.toggle}
          </Button>
        </div>

      </div>
      // End of parent element
    )
  }
}

export default App