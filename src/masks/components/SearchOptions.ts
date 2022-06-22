import Filters from "./Filters";

export default class SearchOptions {
    textQuery: string;
    filters: Filters;

    constructor(dto: any = null) {
        this.textQuery = dto?.textQuery??"";
        this.filters = dto?.filters??new Filters();
    }
} 
