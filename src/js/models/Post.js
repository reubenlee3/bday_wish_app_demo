import axios from 'axios';
import { el } from '../views/base';

export default class Post { 
    constructor(formData){
        this.formData = formData;
    }

    postData(){
        
        const markup = `
        <li>
            <a class="wish-content__link" href="#${this.formData.id}">
                <img class="wish-content__img" src="${this.formData.image}" alt="${this.formData.title}">
                <div class="wish-content__data">
                    <h3 class="wish-content__title">${this.formData.title}</h4>
                    <p class="wish-content__author"><i>${this.formData.author}</i></p>
                    <p class="wish-content__wish">${this.formData.wish}</p>
                </div>
            </a>
        </li>
        `;
        el.wishList.insertAdjacentHTML('afterbegin', markup);

    };
}