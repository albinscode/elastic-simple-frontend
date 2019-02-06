import { Component, Prop, Vue } from 'vue-property-decorator';
import  axios from 'axios';
import { environment } from '../../environment/environment';

export class Result {

    private realPath: string = '';
    private title: string = '';
    private filename: string = '';
    private content: string = '';
    private lastModified: string = '';
    private index: string = '';

    constructor(
        raw: any,
        query: string,
    ) {
        this.title = raw._source.meta.title ? raw._source.meta.title : raw._source.file.filename;
        this.filename = raw._source.file.filename;
        this.lastModified = raw._source.file.last_modified;
        this.index = raw._index;
        this.realPath = environment.fileProxy[this.index] + raw._source.path.virtual;

        this.content = raw.highlight.content[0];
	//const regex = new RegExp('/((\w+)\s){0,10}(' + query + ')\s((\w+)\s){0,10}/m');
        //const result = regex.exec(this.content);
        //if (result) {
        //    this.content = result[0];
        //}
        //this.content = this.content.substr(0, environment.maxContentSize);
    }

}

@Component
export default class SearchPage extends Vue {

    @Prop() private msg!: string;

    // data
    private firstRun = true;
    private query: string = '';
    private results = Array<Result>();
    private additionalParametersUrl: string = `&size=${environment.maxResults}`;

    public checkEnterKey(e) {
        if (e.keyCode == 13) {
            this.runQuery();
        }
    }

    public runQuery() {
    	const query = encodeURI(this.query.trim());
	axios.post(
		environment.searchUrl, {
			query: {
				
				match: {
					content: query,
				}
			},
			size: environment.maxResults,
			highlight: {
				fields: {
					content: {}
				}
			}

		}, {
		    //transformResponse: [(response) => (JSON.parse(response))], 
		    //maxContentLength: 10000000,
	        },
	)
        .then((response) => {
            this.results = response.data.hits.hits.map( (raw: any) => new Result(raw, this.query));
        })
        .catch((e) => {
            alert('Problème lors de la récupération des résultats');
        });
    }

    public openLink(url: string) {
        window.open(url);
    }

}
