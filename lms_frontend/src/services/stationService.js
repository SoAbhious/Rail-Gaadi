import axios from "axios"


export function getStation() {
    return axios.get('http://127.0.0.1:8000/base/station/')
        .then(response => response.data)
}

export function deleteStation(id) {
    return axios.delete('http://127.0.0.1:8000/base/station/' + id + '/',
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

        })
        .then(response => response.data)
}

export function updateStation(id, station) {
    return axios.put('http://127.0.0.1:8000/base/station/' + id + '/', {
        name: station.name.value,
        address: station.address.value,
        station_code: station.station_code.value
        
    })
        .then(response => response.data)
}

export function addStation(station) {
    return axios.post('http://127.0.0.1:8000/base/station/', {
        id: null,
        name: station.name.value,
        address: station.address.value,
        station_code: station.station_code.value
    })
        .then(response => response.data)
        .catch((error) => {
            console.error(error.response.data);
        });
}