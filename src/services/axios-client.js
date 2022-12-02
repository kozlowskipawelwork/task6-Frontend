import axios from "axios";
import { variables } from "../Variables";


export const axiosClient = axios.create({
    baseURL: variables.API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});