import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, Col, Form, Row } from "react-bootstrap";
import authService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import clientService from "../services/cliente.service";
import { cpf as cpfvalidator } from "cpf-cnpj-validator";
import { cpfMask } from "../utils/Utils";
import Header from "../components/Header";

function Teste() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');

    const handleChangeCpf = (e) => {
        setCpf(e.target.value);
    }

    const handleChangeName = (e) => {
        setNome(e.target.value);
    }

    const handleTeste = (e) => {
        e.preventDefault();
        clientService.createTeste(nome, cpf).then(
            () => {
                alert('foi!')
            },
            (error) => {
                alert("nome " + nome + " e CPF " + cpf)
            }
        );
    };

    return (
        <>
            <div className="container p-5 mt-5">
            <div className="card mb-4">
                <div className="card-body p-0">
                    <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                        <span>User activity</span>
                        <span className="flex-grow-1" />
                        <span className="badge badge-pill badge-warning">Updated daily</span>
                    </div>
                    <div className="d-flex border-bottom justify-content-between p-3">
                        <div className="flex-grow-1">
                            <span className="text-small text-muted">Pages / Visit</span>
                            <h5 className="m-0">2065</h5>
                        </div>
                        <div className="flex-grow-1">
                            <span className="text-small text-muted">New user</span>
                            <h5 className="m-0">465</h5>
                        </div>
                        <div className="flex-grow-1">
                            <span className="text-small text-muted">Last week</span>
                            <h5 className="m-0">23456</h5>
                        </div>
                    </div>
                    <div className="d-flex border-bottom justify-content-between p-3">
                        <div className="flex-grow-1">
                            <span className="text-small text-muted">Pages / Visit</span>
                            <h5 className="m-0">1829</h5>
                        </div>
                        <div className="flex-grow-1">
                            <span className="text-small text-muted">New user</span>
                            <h5 className="m-0">735</h5>
                        </div>
                        <div className="flex-grow-1">
                            <span className="text-small text-muted">Last week</span>
                            <h5 className="m-0">92565</h5>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between p-3">
                        <div className="flex-grow-1">
                            <span className="text-small text-muted">Pages / Visit</span>
                            <h5 className="m-0">3165</h5>
                        </div>
                        <div className="flex-grow-1">
                            <span className="text-small text-muted">New user</span>
                            <h5 className="m-0">165</h5>
                        </div>
                        <div className="flex-grow-1">
                            <span className="text-small text-muted">Last week</span>
                            <h5 className="m-0">32165</h5>
                        </div>
                    </div>
                </div>
            </div>
                <div className="col-md-12">
                    <form onSubmit={handleTeste}>
                        <div className="card">
                            <h3 className="card-header">Teste</h3>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <label>Nome</label>
                                        <input type="text" name="name" className="form-control"
                                            onChange={handleChangeName} />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label>CPF</label>
                                        <input type="text" name="cpf" className="form-control"
                                            onChange={handleChangeCpf} />
                                    </div>
                                </div>
                                <div className="row mt-3 mb-2">
                                    <div className="col-12">
                                        <button className="btn btn-primary btn-block p-2" onClick={handleTeste}>Teste
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Teste;
