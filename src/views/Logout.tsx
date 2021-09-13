import React, {useState} from 'react';
import {Jumbotron, Container, Button, Navbar, Nav, NavDropdown, Row, Form, Card} from 'react-bootstrap';
import Header from "../components/Header";
import authService from '../services/auth.service'
import {useHistory} from "react-router-dom";

function Logout() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const history = useHistory();
    authService.logout();
    history.push('/');

    return (
        <>
        </>
    )
        ;
}

export default Logout;
