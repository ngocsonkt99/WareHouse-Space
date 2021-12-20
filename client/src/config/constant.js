import axioss from 'axios';
// const ApiLink =" https://api-warehouse.herokuapp.com/api/";

const ApiLink = "http://localhost:5000/api/";

const axios = axioss.create({
    baseURL: ApiLink,
    timeout: 15 * 1000,
})

export { ApiLink, axios };