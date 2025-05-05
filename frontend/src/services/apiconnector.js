import axios from 'axios';

// const axios = require('axios');
export const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData,headers,params) => {
    return axiosInstance({
        method:`${method}`,
        url : `${url}`,
        bodyData : bodyData ? bodyData : null,
        headers : headers ? headers : null,
        params : params ? params:null
    })
}