export const environment: any = {
    // the elastic search server url
    searchUrl: "http://localhost:9200/_search",

    // the number of results to display on the results page
    maxResults: 100,

    // where the files are stored and accessible to users
    // the key is your index name, and the value is your web server that provides the files
    fileProxy: {
        gso: "http://10.31.0.133/Clients_GSO",
        clients: "http://10.31.0.133/Clients"
    }
};
