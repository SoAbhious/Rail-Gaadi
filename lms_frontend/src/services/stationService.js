import axios from "axios"


export function getStation() {
    return axios.get('http://127.0.0.1:8000/base/station/')
        .then(response => response.data)
}