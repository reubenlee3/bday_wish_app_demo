import '../css/style.css';
import '../img/icons.svg';
import '../img/danbam.png';
import '../img/dessert.png';
import axios from 'axios';


//  Model Imports
import List from './models/List';
import Post from './models/Post';

import { Search, SearchItem } from './models/Search';


// Views Imports
import * as listView from './views/listView';
import * as postView from './views/postView';
import * as searchView from './views/searchView';

// Base Imports
import { el, renderLoader, clearLoader } from './views/base';
import { setTimeout } from 'core-js';

import {dataList} from './models/dataDummy'

const state = {};
window.x = new Search('happy');
window.z = new SearchItem(74)
window.y = dataList;

/*****************************
 * Full List controller
 *****************************/

// Get the full list of wishes 
const controlList = () => {

    state.list = new List();

    renderLoader(el.wishContent);

    setTimeout(() => {
            // Retrive search results
            state.list.getFullList();

            // Prepare UI
            listView.clearList();
            clearLoader();

            // Render wishes on to wish body
            listView.renderWishList(state.list.result);

    }, 3000)
};

/*****************************
 * Search List controller
 *****************************/

// Function for the search body
const controlSearch = () => {
    // 1. Get query from view
    const query = searchView.getSearchInput();

    if (query) {
        // 2. new search object and add to state 
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(el.searchContent);

        setTimeout(() => {
            // Retrive search results
            state.search.getResults();

            // 5. render results on UI
            clearLoader();
            searchView.renderSearchResults(state.search.result);

        }, 1500)
    }
};

// Function to display search result when clicked on
const controlSearchItem = () => {

    // Retrieve id from the nav bar
    const id = window.location.hash.replace('#', '');

    if (id) {

        // Prep UI for changes
        listView.clearList();
        renderLoader(el.wishContent); 

        // create new search item object
        state.searchItem = new SearchItem(id);

        setTimeout(() => {

            // get the search item data
            state.searchItem.getResults();

            // Put new search item into UI
            clearLoader();
            searchView.renderSingleSearch(state.searchItem);

        }, 500)
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlSearchItem));

// Search button hit
el.searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    controlSearch();
});


  
/*****************************
 * Post form controller
 *****************************/

// Push form data
const controlPost = () => {
    // Get text data
    const textData = postView.getTextData();
    // Get image data
    const imageFile = postView.getImage();
    // Create form data
    const formData = postView.prepForm(textData, imageFile);
    

    // Create new post object
    state.post = new Post(formData);
    renderLoader(el.modalContent);
    console.log(state.post)
    setTimeout(() => {

        // Attempt to post data
        postView.postData(formData);
        // Close modal
        el.modal.style.display = "none";
        alert('Form Submitted!');
        postView.clearInputs();
        clearLoader();

        // Render results again to show the new post
        // controlList();
    }, 1000)
    
};


// When the user clicks on the button, open the modal (display of modal from none to block)
el.openModal.addEventListener('click', () => {
    el.modal.style.display = "block";
});

// When the user clicks on (x), close the modal
el.closeBtn.onclick = function() {
    el.modal.style.display = "none";
};

/* When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == el.modal) {
        el.modal.style.display = "none";
    }
});
*/

// Push form data when submit button is clicked
el.submit.onclick = function() {
    controlPost();
}


/*****************************
 * Window controller
 *****************************/

// Information modal


el.modalInfoClose.onclick = function() {
    el.modalInfo.style.display = "none";
};


// Reset View 

const resetList = () => {

    // clear the wish contents
    listView.clearList();
    searchView.clearResults();

    // render the loader
    renderLoader(el.wishContent);

    // get full list of wishes
    try {

        // get the search item data
        controlList();

        clearLoader();

    }

    catch {
        alert('Something went wrong, could you try again?')
    }
};

el.resetBtn.addEventListener('click', resetList);




// Load the full list when the page loads
window.addEventListener('load', () => {

    // Load the information modal
    el.modalInfo.style.display = "block";

    // Load all wishes upon loading window
    controlList();

})
