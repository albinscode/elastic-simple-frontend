# elastic-light-frontend

This tiny and simple frontend allows to connect to the Elastic Search search API.

Then you can perform simple searches based on the content of your indexed documents.

## Project setup
```
yarn install
```

### Customize configuration

The environment shall be set to fit your needs.

Edit the `environement.dev.ts` (or create a new one, then reference it into `environment.ts)`.

~~~
export const environment = {

    // the elastic search server url
    searchUrl: 'http://localhost:9200/_search',

    // the number of results to display on the results page
    maxResults: 100,

    // where the files are stored and accessible to users
    // the key is your index name, and the value is your web server that provides the files
    fileProxy: {
        myindex: 'http://myfileserver/folder',
    },
};
~~~


### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
