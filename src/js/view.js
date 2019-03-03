import EventEmitter from './eventEmitter';
export default class View extends EventEmitter {
    constructor() {
        this.container = document.querySelector('#unsplash');
        this.featureCollection = '.j-feature-collection';
    }

    init() {
        this.container.emit('init');
    }

    renderList(container, data) {
        data.forEach( (obj) => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            listItem.textContent = obj.text;
            link.href = obj.link;
            listItem.appendChild(link);
            container.appendChild(listItem);
        });
    }

}