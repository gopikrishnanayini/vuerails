import Ajax from './ajax';

const _request = (method, url, data) => {

    let options = {
        method: method,
        url: url,
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (data && method == 'GET') {
        options.params = data;
    } else if (data) {
        options.data = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    return new Promise((resolve, reject) => {
        Ajax.request(options)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
              if(error) {
                error.message = error.message || `${error.status} ${error.statusText}`;
                reject(error);
              }
            });
    });

};

const DataService = {
    get(url, data) {
        return _request('GET', url, data);
    },
    post(url, data) {
        data.authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        return _request('POST', url, data);
    },
    put(url, data) {
        data.authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        return _request('PUT', url, data);
    },
    patch(url, data) {
        return _request('PATCH', url, data);
    },
    delete(url,data = {}) {
        data.authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        return _request('DELETE', url, data);
    }
};

export default DataService;
