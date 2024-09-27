const { default: axios } = require("axios");


const apiAnime = axios.create({
    baseURL: 'https://api.jikan.moe/v4/'
})

export default apiAnime