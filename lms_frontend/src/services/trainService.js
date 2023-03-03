import axios from "axios"


export function getTrain() {
    return axios.get('http://127.0.0.1:8000/base/train/')
        .then(response => response.data)
}

export function addTrain(train) {
    return axios.post('http://127.0.0.1:8000/base/train/', {
        id: null,
        name: train.name.value,
        source: train.source.value,
        destination: train.destination.value,
        traveltime: train.traveltime.value,
        sl: train.sl.value,
        ac1: train.ac1.value,
        ac2: train.ac2.value,
        ac3: train.ac3.value
    })
        .then(response => response.data)
        .catch((error) => {
            console.error(error.response.data);
        });
}

export function updateTrain(id, train) {
    return axios.put('http://127.0.0.1:8000/base/train/' + id + '/', {
        name: train.name.value,
        source: train.source.value,
        destination: train.destination.value,
        traveltime: train.traveltime.value,
        sl: train.sl.value,
        ac1: train.ac1.value,
        ac2: train.ac2.value,
        ac3: train.ac3.value
    })
        .then(response => response.data)
}

export function deleteTrain(id) {
    return axios.delete('http://127.0.0.1:8000/base/train/' + id + '/',
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

        })
        .then(response => response.data)
}

export function updateTrainSeats(id, cls, seats) {
    if (cls == 'SL') {
        return axios.put(`http://127.0.0.1:8000/base/helper-train/${id}/`, {
            sl: seats 
        })
            .then(response => response.data)
    } else if (cls == '1A') {
        return axios.put(`http://127.0.0.1:8000/base/helper-train/${id}/`, {
            ac1: seats 
        })
            .then(response => response.data)
    } else if (cls == '2A') {
        return axios.put(`http://127.0.0.1:8000/base/helper-train/${id}/`, {
            ac2: seats 
        })
            .then(response => response.data)
    } else {
        return axios.put(`http://127.0.0.1:8000/base/helper-train/${id}/`, {
            ac3: seats 
        })
            .then(response => response.data)
    }
}
