import EventEmitter from './eventEmitter';
export default class View extends EventEmitter {
    constructor() {
        super();
        this.container = document.querySelector('.j-container');
        this.featureCollection = document.querySelector('.j-feature-collection');

        document.querySelector('.j-more-btn').addEventListener('click', () => {
            this.emit('showMore', null);
        });
    }

    async renderTitles(data) {
        const result = await data;
        const titles = result.map( collection => {
            return {
                title: collection.title,
                src: collection.links.self
            }
        });
        titles.forEach( title => {
            const li = document.createElement('li');
            li.textContent = title.title;
            li.dataset.src = title.src;
            this.featureCollection.appendChild(li);
        })
    }

    async renderColections(data) {
        const result = await data;
        this.container.innerHTML = '';
        result.forEach( (collection) => {
            this.createCollection(collection);
        });
    }

    async renderSelectCollection(data) {
        this.container.innerHTML = '';
        const result = await data;
        result.forEach((collectionItem) => {
            this.createColectionItem(collectionItem);
        });
    }

    async updateSelectCollection(data) {
        const result = await data;
        result.forEach((collectionItem) => {
            this.createColectionItem(collectionItem);
        });
    }

    createColectionItem(data) {
        const element = document.createElement('div');
        const preview = document.createElement('img');
        preview.src = data.urls.small;
        preview.addEventListener('click', () => {
            this.emit('showFullImg', data.urls.full);
        });
        element.appendChild(preview);
        element.classList.add('collection-item');
        this.container.appendChild(element);
    }

    createCollection(data) {
        const element = document.createElement('div');
        element.dataset.id = data.id;
        const preview = document.createElement('img');
        const title = document.createElement('p');
        const total = document.createElement('p');
        total.textContent = `Show all photos: ${data.total_photos}`;
        total.classList.add('j-collection');
        total.addEventListener('click', () => {
            this.emit('showPhotos', data.id);
        });
        title.textContent = data.title;
        preview.src = data.preview_photos[0].urls.small;
        element.appendChild(preview);
        element.appendChild(title);
        element.appendChild(total); 
        element.classList.add('collection-item');
        this.container.appendChild(element);
    }

}