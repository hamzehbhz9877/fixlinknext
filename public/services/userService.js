import axios from "axios"

const RegisterUser = user => axios.post('/api/v1/Account/Register', JSON.stringify(user));
const LoginUser = user => axios.post('/api/v1/Account/Login', JSON.stringify(user));


export {RegisterUser, LoginUser}

