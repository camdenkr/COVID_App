const api = {
    COVID_countries(){
        const url = 'https://api.covid19api.com/summary'
        return fetch(url).then((res) => res.json())
    }
}

module.exports = api;