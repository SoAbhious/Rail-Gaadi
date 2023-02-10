import axios from "axios";

export function getUser() {
    return axios.get('http://127.0.0.1:8000/base/user/')
        .then(response => response.data)
}


export function addUser(user) {
    return axios.post('http://127.0.0.1:8000/base/user/', {
        id:null,
        username:user.username.value,
        firstname:user.firstname.value,
        lastname:user.lastname.value,
        password:user.password.value,
        gender:user.gender.value,
        dob:user.dob.value,
        email:user.email.value,
        phone:user.phone.value,
        aadhar:user.aadhar.value
    })
      .then(response => response.data) 
}

export function verifyUser(user) {
    const otp_digit = Math.floor(100000 + Math.random() * 900000)
    try {
        return axios.post('http://127.0.0.1:8000/base/verify-user/', {
        id:null,
        username:user.username.value,
        firstname:user.firstname.value,
        lastname:user.lastname.value,
        password:user.password.value,
        gender:user.gender.value,
        dob:user.dob.value,
        email:user.email.value,
        phone:user.phone.value,
        aadhar:user.aadhar.value,
        otp_digit:otp_digit
    }).then((response) => { window.location.href = `/verify-user/${response.data[0].id}/`});
    } catch(error) {
        console.log(error);
    }
     
}

export function updateUser(id, user) {
    return axios.put('http://127.0.0.1:8000/base/user/' + id + '/', {
        username:user.username.value,
        firstname:user.firstname.value,
        lastname:user.lastname.value,
        gender:user.gender.value,
        dob:user.dob.value,
        email:user.email.value,
        phone:user.phone.value,
        aadhar:user.aadhar.value
    })
      .then(response => response.data) 
}

export function deleteUser(id) {
    return axios.delete('http://127.0.0.1:8000/base/user/' + id + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    })
        .then(response => response.data)
}

export function getBooking() {
    return axios.get('http://127.0.0.1:8000/base/booking/')
        .then(response => response.data)
}

export function getTicket() {
    return axios.get('http://127.0.0.1:8000/base/ticket/')
        .then(response => response.data)
}

export function getPassenger() {
    return axios.get('http://127.0.0.1:8000/base/passenger/')
        .then(response => response.data)
}

export function getUserPassenger() {
    const userid = localStorage.getItem('userid')

    return axios.get(`http://127.0.0.1:8000/base/user-passengers/${userid}/`)
        .then(response => response.data)
}

export function updateUserPassword(id, user) {
    return axios.put(`http://127.0.0.1:8000/base/user/${id}/`, {
        password:user.password.value
    })
      .then(response => response.data) 
}

export function updatePassenger(id, passenger) {
    return axios.put('http://127.0.0.1:8000/base/passenger/' + id + '/', {
        name:passenger.name.value,
        age:passenger.age.value, 
        mobile:passenger.mobile.value
    })
      .then(response => response.data) 
}

export function addPassenger(passenger) {
    const userid = localStorage.getItem('userid')

    return axios.post('http://127.0.0.1:8000/base/passenger/', {
        id:null,
        userid:userid,
        name:passenger.name.value,
        age:passenger.age.value,
        mobile:passenger.mobile.value
    })
      .then(response => response.data) 
}

export function deletePassenger(id) {
    return axios.delete('http://127.0.0.1:8000/base/passenger/' + id + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    })
        .then(response => response.data)
}