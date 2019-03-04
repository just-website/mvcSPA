import EventEmitter from './eventEmitter';
export default class Popup extends EventEmitter {
    constructor() {
        super();
        this.wrapper = document.querySelector('.j-popup-wrapper');
        this.popup = document.querySelector('.j-popup');
        this.data
    }

    init(data) {
        console.log(data);
    }
}