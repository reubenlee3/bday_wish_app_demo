import { el } from './base';

export const getTextData = () => {
    const obj = {
        title: el.title.value,
        author: el.author.value,
        wish: el.wish.value,
    }
    if(obj.title === "" || obj.author === "" || obj.wish === "") {
        alert("Please fill all text boxes! (Image not required)");
        return;
    }
    return obj;
};

export const getImage = () => {
    
    return 'img/danbam.png'
};

export const prepForm = (textData, imageFile) => {
    const formData = {
        'id': 9999,
        'title': textData.title,
        'author': textData.author,
        'wish': textData.wish,
        'image': imageFile,
    };
    
    console.log(formData.id)
    return formData;    
}

export const postData = (formData) => {
    const markup = `
        <li>
            <a class="wish-content__link" href="#${formData.id}">
                <img class="wish-content__img" src="${formData.image}" alt="${formData.title}">
                <div class="wish-content__data">
                    <h3 class="wish-content__title">${formData.title}</h4>
                    <p class="wish-content__author"><i>${formData.author}</i></p>
                    <p class="wish-content__wish">${formData.wish}</p>
                </div>
            </a>
        </li>
        `;
    el.wishList.insertAdjacentHTML('afterbegin', markup); 
}


export const clearInputs = () => {
    el.title.value = "";
    el.author.value = "";
    el.wish.value = "";    
}