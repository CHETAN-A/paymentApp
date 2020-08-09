import Axios from '../../axios';

class API {

    appConfig = (props) => {
        /*
          Method for:                    Get App Config
          Parameters Required:           props
          Optional Parameters Required:  None
          Callbacks Required:            setState
          Output:                        Get App Config details
        */

        let url = '/app_config/';

        Axios.get(url)
            .then(response => {
                console.log(response);
                props.setState(response.data)
            })
            .catch(error => {
                console.log(error);
                if (error && error.response && error.response.status === 500) {
                    console.log('Server Error');
                }
            })
    }

    getAll = (props) => {
        let queryParams = '?';
        let queries = [];

        if (props.limit)
            queries.push(`_limit=${props.limit}`);
        if (props.page)
            queries.push(`_page=${props.page}`);
        queryParams += queries.join('&');

        return Axios.get(props.url + queryParams)
            .then(response => {
                console.log(response.data);
                // props.setState({
                //     data: response.data,
                //     count: response.headers['x-total-count']
                // });
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
}

export default API;