import axios from "axios"


export function getRoute() {
    return axios.get('http://127.0.0.1:8000/base/route/')
        .then(response => response.data)
}

export function addRoute(route) {
    return axios.post('http://127.0.0.1:8000/base/route/', {
        id:null,
        name:route.name.value,
        source:route.source.value,
        destination:route.destination.value
    })
      .then(response => response.data) 
      .catch((error) => {
        console.error(error.response.data);
        });
}

export function deleteRoute(id) {
    return axios.delete('http://127.0.0.1:8000/base/route/' + id + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    })
        .then(response => response.data)
}

export function addRouteStations(finalForm) {
    return axios.post('http://127.0.0.1:8000/base/route-stations/', finalForm)
}