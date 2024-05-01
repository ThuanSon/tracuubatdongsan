const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://partner.viettelpost.vn/v2/categories/listDistrict',
    // headers: {
    //     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    //     'X-RapidAPI-Host': 'api-tinh-thanh-quan-huyen-xa-phuong-viet-nam.p.rapidapi.com'
    // }
};

try {
    const response = axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}