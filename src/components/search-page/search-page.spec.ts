import SearchPage from "./search-page.vue";
import Vue from "vue";

describe("Search page default tests", () => {
    it("renders correctly", done => {
        const comp = new Vue(SearchPage).$mount();
        comp.$nextTick(() => {
            expect(comp.$el).toMatchSnapshot();
            done();
        });
    });
});
