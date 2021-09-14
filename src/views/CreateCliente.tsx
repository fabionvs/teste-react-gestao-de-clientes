import React, {useState} from 'react';
import {Jumbotron, Container, Button, Navbar, Nav, NavDropdown, Row, Form, Card, Table, Alert} from 'react-bootstrap';
import Header from "../components/Header";
import authService from '../services/auth.service'
import cepService from '../services/cep.service'
import clientService from '../services/cliente.service'
import {useHistory} from "react-router-dom";
import {cepMask, cpfMask, telefoneMask} from "../utils/Utils"
import {cpf as cpfvalidator} from 'cpf-cnpj-validator';

function Login() {
    const [nome, setNome] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [uf, setUf] = useState("");
    const [complemento, setComplemento] = useState("");

    const [cep, setCep] = useState("");
    const [erroCep, setErroCep] = useState(false);

    const [cpf, setCpf] = useState("");
    const [erroCpf, setErroCpf] = useState(false);

    const [telefone, setTelefone] = useState("");
    const [tipoTelefone, setTipoTelefone] = useState("Residencial");
    const [telefones, setTelefones] = useState([] as any);
    const [telefoneError, setTelefoneError] = useState(false);
    const [telefoneErrorValidacao, setTelefoneErrorValidacao] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorValidacao, setEmailErrorValidacao] = useState(false);
    const [emails, setEmails] = useState([] as any);


    const history = useHistory();

    const handleChangeNome = (e) => {
        if (e.target.value.match("^[a-zA-Z ]*$") != null) {
            setNome(e.target.value);
        }
    }
    const handleChangeCpf = (e) => {
        if (cpfvalidator.isValid(e.target.value.replace(".", "").replace("-", ""))) {
            setErroCpf(false);
        } else {
            setErroCpf(true);
        }
        setCpf(cpfMask(e.target.value));
    }

    const handleChangeCep = (e) => {
        if (e.target.value.match("^[0-9]*$") != null) {
            setCep(cepMask(e.target.value));
            let cepSemFormato = e.target.value.replace(".", "").replace("-", "")
            var validacep = /^[0-9]{8}$/;
            //Valida o formato do CEP.
            if (validacep.test(cepSemFormato)) {
                cepService.buscarCep(cepSemFormato).then(response => {
                    setLogradouro(response.logradouro);
                    setBairro(response.bairro);
                    setUf(response.uf);
                    setCidade(response.localidade);
                    setErroCep(false);
                    if (response.erro == true) {
                        setErroCep(true);
                    }
                });
            }
        }
    }

    const handleChangeLogradouro = (e) => {
        setLogradouro(e.target.value);
    }

    const handleChangeBairro = (e) => {
        setBairro(e.target.value);
    }

    const handleChangeUf = (e) => {
        setUf(e.target.value);
    }

    const handleChangeCidade = (e) => {
        setCidade(e.target.value);
    }

    const handleChangeComplemento = (e) => {
        setComplemento(e.target.value);
    }

    const handleChangeTelefone = (e) => {
        setTelefone(telefoneMask(e.target.value));
    }

    const handleChangeTipoTelefone = (e) => {
        setTipoTelefone(e.target.value);
    }

    const adicionarNumero = (e) => {
        let tel = telefone.replace(/\D/g, "");
        let existe = telefones.find(i => i.numero === telefone);
        if (existe != null) {
            setTelefoneError(true);
            return false;
        }
        if (tel.length < 10) {
            setTelefoneErrorValidacao(true);
            return false;
        }
        setTelefoneErrorValidacao(false);
        setTelefoneError(false);
        setTelefones([...telefones, {numero: telefone, tipo: tipoTelefone}]);
    }

    const handleChangeEmails = (e) => {
        setEmail(e.target.value);
    }

    const adicionarEmail = (e) => {
        let existe = emails.find(i => i.email === email);
        if (existe != null) {
            setEmailErrorValidacao(true);
            return false;
        }
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            setEmails([...emails, {email: email}]);
            setEmailError(false);
        } else {
            setEmail("")
            setEmailError(true);
        }
    }

    const criarCliente = (e) => {
        e.preventDefault();
        let trataCpf = cpf.replaceAll("-", "").replaceAll(".", "");
        let trataCep = cep.replaceAll("-", "").replaceAll(".", "");
        clientService.createClient(nome, trataCpf, trataCep, logradouro, cidade, bairro, uf, complemento, telefones, emails).then(
            () => {
                history.push('/');
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
            <Row className="justify-content-md-center h-100 mt-5">
                <Container>
                    <Form onSubmit={criarCliente}>
                        <div className="col-12">
                            <Card className="my-auto">
                                <Card.Body>
                                    <h3>Dados do Cliente</h3>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Nome do Cliente</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            name="nome"
                                            value={nome}
                                            onChange={handleChangeNome}
                                            required
                                            maxLength={100}
                                            minLength={3}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            name="cpf"
                                            value={cpf}
                                            onChange={handleChangeCpf}
                                            required
                                        />
                                    </Form.Group>
                                    {erroCpf == true &&
                                    <Alert variant="warning">
                                        <b>Atenção!</b> CPF inválido!
                                    </Alert>
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 mt-3">
                            <Card className="my-auto">
                                <Card.Body>
                                    <h3>Endereço</h3>
                                    <Row>
                                        <div className="col-md-3">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>CEP</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    name="cep"
                                                    value={cep}
                                                    onChange={handleChangeCep}
                                                    required
                                                    maxLength={10}
                                                />
                                            </Form.Group>
                                        </div>
                                    </Row>
                                    {erroCep == true &&
                                    <Alert variant="warning">
                                        <b>Atenção!</b> Cep inválido!
                                    </Alert>
                                    }
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Logradouro</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            name="logradouro"
                                            value={logradouro}
                                            onChange={handleChangeLogradouro}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            name="bairro"
                                            value={bairro}
                                            onChange={handleChangeBairro}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            name="cidade"
                                            value={cidade}
                                            onChange={handleChangeCidade}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>UF</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            name="uf"
                                            value={uf}
                                            onChange={handleChangeUf}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Complemento</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            name="uf"
                                            value={complemento}
                                            onChange={handleChangeComplemento}
                                        />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 mt-3">
                            <Card className="my-auto">
                                <Card.Body>
                                    <h3>Telefones</h3>
                                    <Row>
                                        <div className="col-md-3">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Número</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    name="telefone"
                                                    value={telefone}
                                                    onChange={handleChangeTelefone}
                                                    required
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-3">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Tipo de Telefone</Form.Label>
                                                <Form.Control as="select" value={tipoTelefone} onChange={handleChangeTipoTelefone}>
                                                    <option value="Residencial">Residencial</option>
                                                    <option value="Comercial">Comercial</option>
                                                    <option value="Celular">Celular</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-3 mt-4 pt-2">
                                            <Button variant="secondary" onClick={adicionarNumero}>
                                                Adicionar Número
                                            </Button>
                                        </div>
                                    </Row>
                                    {telefoneError == true &&
                                    <Alert variant="warning">
                                        <b>Atenção!</b> Telefone já existe!
                                    </Alert>
                                    }
                                    {telefoneErrorValidacao == true &&
                                    <Alert variant="danger">
                                        <b>Atenção!</b> Telefone inválido!
                                    </Alert>
                                    }
                                    {telefones.length > 0 &&
                                    <Row>
                                        <div className="col-12">
                                            <Table striped bordered hover size="sm" borderless={true}>
                                                <thead>
                                                <tr>
                                                    <th>Telefone</th>
                                                    <th>Tipo</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {telefones.map((tel) => <tr>
                                                    <td>{tel.numero}</td>
                                                    <td>{tel.tipo}</td>
                                                </tr>)}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Row>
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 mt-3">
                            <Card className="my-auto">
                                <Card.Body>
                                    <h3>Emails</h3>
                                    <Row>
                                        <div className="col-md-3">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    name="email"
                                                    value={email}
                                                    onChange={handleChangeEmails}
                                                    required
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-3 mt-4 pt-2">
                                            <Button variant="secondary" onClick={adicionarEmail}>
                                                Adicionar Email
                                            </Button>
                                        </div>
                                    </Row>
                                    {emailError == true &&
                                    <Alert variant="warning">
                                        <b>Atenção!</b> Email não é válido!
                                    </Alert>
                                    }
                                    {emailErrorValidacao == true &&
                                    <Alert variant="danger">
                                        <b>Atenção!</b> Email já existe!
                                    </Alert>
                                    }
                                    {emails.length > 0 &&
                                    <Row>
                                        <div className="col-12">
                                            <Table striped bordered hover size="sm" borderless={true}>
                                                <thead>
                                                <tr>
                                                    <th>Email</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {emails.map((email) => <tr>
                                                    <td>{email.email}</td>
                                                </tr>)}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Row>
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 mt-3">
                            <Card className="my-auto">
                                <Card.Body>
                                    <Button variant="primary" className="btn-block" onClick={criarCliente}>
                                        Cadastrar Cliente
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Form>
                </Container>
            </Row>
        </>
    )
        ;
}

export default Login;
