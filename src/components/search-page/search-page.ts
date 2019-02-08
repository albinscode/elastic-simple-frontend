import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import { environment } from "../../environment/environment";

export class Result {
    private realPath: string = "";
    private title: string = "";
    private filename: string = "";
    private content: string = "";
    private lastModified: string = "";
    private index: string = "";

    constructor(raw: any, query: string) {
        this.title = raw._source.meta.title
            ? raw._source.meta.title
            : raw._source.file.filename;
        this.filename = raw._source.file.filename;
        this.lastModified = raw._source.file.last_modified;
        this.index = raw._index;

        // we try to put the file proxy if defined for the given ES index
        this.realPath =
            (environment.fileProxy[this.index]
                ? environment.fileProxy[this.index]
                : "") + raw._source.path.virtual;

        this.content =
            raw.highlight && raw.highlight.content
                ? raw.highlight.content[0]
                : "";
    }
}

@Component
export default class SearchPage extends Vue {
    @Prop() private msg!: string;

    // data accessible to template
    private firstRun = true;
    private query: string = "";
    private results = Array<Result>();

    public checkEnterKey(e: any) {
        if (e.keyCode == 13) {
            this.runQuery();
        }
    }

    public runQuery() {
        const query = encodeURI(this.query.trim());

        // we query on the content for a given number of results.
        // See https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
        // furthermore, we use the highlight mecanism of ES
        const params = {
            query: {
                multi_match: {
                    query: this.query,
                    type: "phrase",
                    fields: ["content"]
                }
            },
            size: environment.maxResults,
            highlight: {
                fields: {
                    content: {}
                },
                pre_tags: "<b>",
                post_tags: "</b>"
            }
        };

        const options = {
            //transformResponse: [(response) => (JSON.parse(response))],
            //maxContentLength: 10000000,
        };

        axios
            .post(environment.searchUrl, params, options)
            .then(response => {
                this.results = response.data.hits.hits.map(
                    (raw: any) => new Result(raw, this.query)
                );
            })
            .catch((e: any) => {
                console.log(e);
                alert("Problème lors de la récupération des résultats");
            });
    }

    public openLink(url: string) {
        window.open(url);
    }

    public mounted() {
        const query: any = this.$refs.query;
        query.focus();
    }
}
