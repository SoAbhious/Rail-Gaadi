import axios from "axios"

export function getAdmin() {
    const adminid = localStorage.getItem('adminid')

    return axios.get(`http://127.0.0.1:8000/base/admin/${adminid}/`)
        .then(response => response.data)
}

export function updateAdmin(id, admin) {
    return axios.put(`http://127.0.0.1:8000/base/admin/${id}/`, {
        username:admin.username.value,
        firstname:admin.firstname.value,
        lastname:admin.lastname.value,
        gender:admin.gender.value,
        dob:admin.dob.value,
        email:admin.email.value,
        phone:admin.phone.value,
        aadhar:admin.aadhar.value
    })
      .then(response => response.data) 
}

export function updateAdminPassword(id, admin) {
    return axios.put(`http://127.0.0.1:8000/base/admin/${id}/`, {
        password:admin.password.value
    })
      .then(response => response.data) 
}