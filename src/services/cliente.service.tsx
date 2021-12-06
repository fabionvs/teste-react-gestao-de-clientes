import apiService from "./api.service";

const createTeste = (username : string, password : string) => {
    return apiService.post("login", {
        username,
        password,
    }).then((response) => {
        return response.data;
    });
};

const createClient = (nome : string, cpf : string, cep : string, logradouro : string, cidade: string, bairro: string, uf: string, complemento: string, telefones : any, emails: any) => {
    return apiService.post("clientes", {
        nome,
        cpf,
        cep,
        logradouro,
        cidade,
        bairro,
        uf,
        complemento,
        telefones,
        emails
    }).then((response) => {
        return response.data;
    });;
};

const listCliente = () => {
    return apiService
        .get("clientes")
        .then((response) => {
            return response.data;
        });
};

const excludeCliente = (id: string) => {
    return apiService
        .delete(`clientes/${id}`)
        .then((response) => {
            return response.data;
        });
};

const buscar = (username : string, password : string) => {
    return apiService
        .post("login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};


export default {
    createClient,
    listCliente,
    excludeCliente,
    createTeste
};
