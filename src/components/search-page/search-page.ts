import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SearchPage extends Vue {
  @Prop() private msg!: string;
}
