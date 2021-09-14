import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap';
import Header from "../components/Header";
import clienteService from "../services/cliente.service"
import {cepMask, cpfMask} from "../utils/Utils";

function App() {
    const [clientes, setClientes] = useState([] as any);
    useEffect(() => {
        listClientes();
    }, []);
    ;
    const listClientes = () => {
        clienteService.listCliente().then(
            (response: any) => {
                setClientes(response);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

            }
        );
    };
    const excludeClients = (id: string) => {
        clienteService.excludeCliente(id).then(
            (response: any) => {
                listClientes();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

            }
        );
    };
    return (
        <>
            <Header/>
            <Container>
                <Row>
                    <div className="col-12 mt-5 mb-2">
                        <h3>Lista de Clientes</h3>
                        {clientes.length > 0 &&clientes.map((cliente) => <Card className="mt-3">
                            <Card.Body>
                                <h5>#{cliente.id} - {cliente.nome}</h5>
                                <Row>
                                    <div className="col-md-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                CPF
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={cpfMask(cliente.cpf)}/>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                CPF
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={cpfMask(cliente.cpf)}/>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                </Row>
                                <hr/>
                                <Row>
                                    <div className="col-md-12">
                                        <h6>Endereço</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                                CEP
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control plaintext readOnly defaultValue={cepMask(cliente.cep)}/>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-md-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                                Logradouro
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control plaintext readOnly
                                                              defaultValue={cepMask(cliente.logradouro)}/>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                                Bairro
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control plaintext readOnly
                                                              defaultValue={cepMask(cliente.bairro)}/>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                                Cidade
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control plaintext readOnly
                                                              defaultValue={cepMask(cliente.cidade)}/>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                                UF
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control plaintext readOnly defaultValue={cepMask(cliente.uf)}/>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                                Complemento
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control plaintext readOnly
                                                              defaultValue={cepMask(cliente.complemento)}/>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                </Row>
                                <hr/>
                                <Row>
                                    <div className="col-md-12">
                                        <h6>Emails</h6>
                                    </div>
                                    {cliente.emails.map((email) =>
                                        <div className="col-md-6">
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Col sm="12">
                                                    <Form.Control plaintext readOnly
                                                                  defaultValue={email.email}/>
                                                </Col>
                                            </Form.Group>
                                        </div>)}

                                </Row>
                                <hr/>
                                <Row>
                                    <div className="col-md-12">
                                        <h6>Telefones</h6>
                                    </div>
                                    {cliente.telefones.map((telefone) =>
                                        <div className="col-md-6">
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Col sm="3">
                                                    <Form.Control plaintext readOnly
                                                                  defaultValue={telefone.tipo}/>
                                                </Col>
                                                <Col sm="9">
                                                    <Form.Control plaintext readOnly
                                                                  defaultValue={telefone.numero}/>
                                                </Col>
                                            </Form.Group>
                                        </div>)}
                                </Row>
                                <Row>
                                    <Button variant="secondary" className="btn-block btn-sm" onClick={e => {excludeClients(cliente.id) }}>
                                        Excluir Cliente
                                    </Button>
                                </Row>
                            </Card.Body>
                        </Card>)}
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default App;
