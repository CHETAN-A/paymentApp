import Axios from '../../axios';

class API {

    get = (props) => {
        /*
          Method for:                    Get API
          Parameters Required:           url
          Optional Parameters Required:  None
          Callbacks:                     callback
          Output:                        calls callback with response.data returns the same
        */

        return Axios.get(props.url)
            .then(response => {
                if (props.callback) props.callback(response.data);
                return response.data;
            })
            .catch(error => {
                console.log(error);
                if (error && error.response && error.response.status === 500) {
                    console.log('Server Error');
                }
            })
    }

    getAll = (props) => {
        /*
          Method for:                    Get All data
          Parameters Required:           url
          Optional Parameters Required:  limit, page
          Callbacks:                     callback
          Output:                        calls callback with response.data returns the same
        */

        let queryParams = '?';
        let queries = [];

        if (props.limit)
            queries.push(`_limit=${props.limit}`);
        if (props.page)
            queries.push(`_page=${props.page}`);
        queryParams += queries.join('&');

        return Axios.get(props.url + queryParams)
            .then(response => {
                if (props.callback)
                    props.callback({
                        data: response.data,
                        count: response.headers['x-total-count']
                    });
                return {
                    data: response.data,
                    count: response.headers['x-total-count']
                };
            })
            .catch(error => {
                console.log(error);
                if (error && error.response && error.response.status === 500) {
                    console.log('Server Error');
                }
            })
    }

    post = (props) => {
        /*
          Method for:                    Make POST call
          Parameters Required:           url, data
          Optional Parameters Required:  nil
          Callbacks:                     callback
          Output:                        calls callback with response.data returns the same
        */
        return Axios.post(props.url, props.data)
            .then(response => {
                console.log(response);
                if (props.callback) props.callback(response.data);
                return response.data
            })
            .catch(error => {
                console.log(error);
                if (error && error.response && error.response.status === 500) {
                    console.log('Server Error');
                }
            })
    }
}

export default API;