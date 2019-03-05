import Popup from './popup';
export default class View extends Popup {
    constructor() {
        super();
        this.container = document.querySelector('.j-container');
        this.featureCollection = document.querySelector('.j-feature-collection');
        this.backBtn = document.querySelector('.j-back-btn');
        this.title = document.querySelector('.j-title');
        this.moreBtn = document.querySelector('.j-more-btn');
        this.popup = new Popup;

        this.moreBtn.addEventListener('click', () => {
            this.emit('showMore', null);
        });

        this.backBtn.addEventListener('click', (event) => {
            this.emit('goBack', null);
            this.hideElem(event.target);
            this.title.textContent = 'Unsplash Collections';
        });
    }

    renderTitles(data) {
        const titles = data.map( collection => {
            return {
                title: collection.title,
                src: collection.links.self,
                id: collection.id
            }
        });
        this.featureCollection.textContent = '';
        titles.forEach( title => {
            const li = document.createElement('li');
            li.textContent = title.title;
            li.dataset.src = title.src;
            li.dataset.id = title.id;
            li.addEventListener('click', () => {
                this.emit('showPhotos', title.id);
                this.title.textContent = title.title;
            });
            this.featureCollection.appendChild(li);
        })
    }

    renderColections(data) {
        this.container.innerHTML = '';
        data.forEach( (collection) => {
            this.createCollection(collection);
        });
    }

    renderSelectCollection(data) {
        this.container.innerHTML = '';
        data.forEach((collectionItem) => {
            this.createColectionItem(collectionItem);
        });
        this.backBtn.style.display = 'block';
    }

    updateSelectPhotos(data) {
        data.forEach((photoItem) => {
            this.createColectionItem(photoItem);
        });
    }

    updateCollections(data) {
        data.forEach((collectionItem) => {
            this.createCollection(collectionItem);
        });
    }

    createColectionItem(data) {
        const element = document.createElement('div');
        const preview = document.createElement('img');
        preview.src = data.urls.small;
        preview.addEventListener('click', () => {
            this.emit('showFullImg', data.id);
        });
        element.appendChild(preview);
        element.classList.add('collection-item', 'collection-photo');
        this.container.appendChild(element);
    }

    createCollection(data) {
        const element = document.createElement('div');
        element.dataset.id = data.id;
        const preview = document.createElement('img');
        const title = document.createElement('p');
        const allPhoto = document.createElement('p');
        allPhoto.textContent = `Show all photos: ${data.total_photos}`;
        allPhoto.classList.add('j-collection');
        allPhoto.addEventListener('click', () => {
            this.emit('showPhotos', data.id);
            this.title.textContent = data.title;
        });
        title.textContent = data.title;
        preview.src = data.preview_photos[0].urls.small;
        element.appendChild(preview);
        element.appendChild(title);
        element.appendChild(allPhoto); 
        element.classList.add('collection-item');
        this.container.appendChild(element);
    }

    showFullImg(data) {
        this.popup.init(data);
    }

    hideElem(elem) {
        elem.style.display = 'none';
    }

    showElem(elem) {
        elem.style.display = 'inline-block';
    }

}