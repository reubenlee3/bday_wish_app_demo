import axios from 'axios'
import { dataList } from './dataDummy'

export class Search {
    constructor(query) {
        this.query = query;
    }

    getResults() {
        console.log(this.query)

        // retrieve data 
        const dataSearch = dataList;
        this.result = dataSearch.filter((obj) => (obj.author.toLowerCase().includes(this.query) || obj.title.toLowerCase().includes(this.query)));
        

    }
}

export class SearchItem {
    constructor(id) {
        this.id = id;
    }

    getResults() {

        // retrieve data 
        const dataSearch = dataList;
        const res = dataSearch.filter((obj) => (obj.id === parseInt(this.id)));
        
        this.title = res[0].title;
        this.image = res[0].image;
        this.author = res[0].author;
        this.wish = res[0].wish;
        
    }
}
