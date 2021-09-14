import axios from "axios";
import apiService from "./api.service";
import {cepMask, cpfMask} from "../utils/Utils";

const cepService = axios.create();

const buscarCep = value => {
    return fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then(response => response.json())
        .then(data => {
            return data;
        })
}


export default {
    buscarCep,
};

