import Filters from "./Filters";

export default class SearchOptions {
    textQuery: string;
    filters: Filters;

    constructor(textQuery: string, filters: Filters) {
        this.textQuery = textQuery;
        this.filters = filters;
    }
} 
