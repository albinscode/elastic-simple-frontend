import { Component, Prop, Vue } from 'vue-property-decorator';
import  axios from 'axios';
import { environment } from '../../environment/environment';

export class Result {

    private realPath: string = '';
    private title: string = '';
    private filename: string = '';
    private content: string = '';
    private lastModified: string = '';

    constructor(
        raw: any,
        query: string,
    ) {
        this.realPath = environment.fileProxy + raw._source.path.virtual;
        this.title = raw._source.meta.title ? raw._source.meta.title : raw._source.file.filename;
        this.filename = raw._source.file.filename;
        this.lastModified = raw._source.file.last_modified;

        this.content = raw._source.content;
        const regex = new RegExp("/((\w+)\s){0,10}(" + query + ")\s((\w+)\s){0,10}/m");
        let result = regex.exec(this.content);
        if (result) {
            this.content = result[0];
        }
        this.content = this.content.substr(0, environment.maxContentSize);
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

    runQuery() {
        axios.get(`${environment.searchUrl}${this.query}${this.additionalParametersUrl}`)
        .then(response => {
            this.results = response.data.hits.hits.map( (raw: any) => new Result(raw, this.query));
        })
        .catch(e => {
            alert('Problème lors de la récupération des résultats');
            console.log(e)
        })
    }

    openLink(url: string) {
        window.open(url);
    }

}
