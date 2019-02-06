export const environment = {

    // the elastic search server url
    //searchUrl: 'http://localhost:9200/_search?q=',
    searchUrl: 'http://localhost:9200/_search',
    maxResults: 100,
    maxContentSize: 200,
    // where the files are stored and accessible to users
    fileProxy: {
        gso: 'http://10.31.0.133/Clients_GSO',
        clients: 'http://10.31.0.133/Clients',
    },
};

