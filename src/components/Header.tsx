import React from 'react';
import '../views/App.css';
import {Jumbotron, Container, Button, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import authService from '../services/auth.service'
import {useHistory, Redirect} from "react-router-dom";


function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Sistema de Gestão de Clientes</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Gerência de Clientes</Nav.Link>
                        <Nav.Link href="/cadastro">Cadastrar Cliente</Nav.Link>
                        {authService.getToken() == null ?
                            <Nav.Link href="/login">Efetuar Login</Nav.Link>
                            :
                            <Nav.Link href="/logout">Sair do Sistema</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
