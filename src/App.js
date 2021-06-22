import React from 'react'
import logo from './img/logo.png'

import {ReadAll} from './componentes/readAll/ReadAll'
import {ReadSingle} from './componentes/readSingle/readSingle'
import {Create} from './componentes/create/Create'
import {DeleteAll} from './componentes/delete-all/DeleteAll'
import {About} from './componentes/about/About'

import './styles/app.scss'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav, Container, Row, Col} from 'react-bootstrap'

import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <> 
      <div className='logoBar'>
        <img className='logo-img' src={logo} alt='Logo do anime Dragonball Z' />
      </div>

      <Navbar className="justify-content-center" expand="sm">
        <Nav>
          <Nav.Link id="link-style" href="/">Inicio</Nav.Link>
          <Nav.Link id="link-style" href="/create">Criar</Nav.Link>
          <Nav.Link id="link-style" href="/delete-all">Deletar Tudo</Nav.Link>
          <Nav.Link id="link-style" href="/about">Sobre</Nav.Link>
        </Nav>
      </Navbar>

      <Container className="app-container">
        <Row>
          <Col>
            <Switch>
              <Route path="/" exact={true} component={ReadAll}></Route>
              <Route path="/create" component={Create}></Route>
              <Route path="/delete-all" component={DeleteAll}></Route>
              <Route path="/about" component={About}></Route>
              <Route path="/view/:id" component={ReadSingle}></Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </> 
  );
}

export default App;
