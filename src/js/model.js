const AccessKey = 'dc698e73290315d4c63f3beedbeb919bca09450b105a8c2422b49a0d18d651dd';
const URL = 'https://api.unsplash.com/'

export default class Model {
    constructor() {
    }

    _getRequest(target) {
        return axios.get(`${URL}${target}`, {
            headers: {
                Authorization: `Client-ID ${AccessKey}`
            }
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getData(target) {
        const data = this._getRequest(target);
        return data;
    }
}

