import EventEmitter from './eventEmitter';
export default class Popup extends EventEmitter {
    constructor() {
        super();
        this.wrapper = document.querySelector('.j-popup-wrapper');
        this.popup = this.wrapper.querySelector('.j-popup');
        
    }

    init(data) {
        this.setTemplate(data);
        this.popup.innerHTML = this.template;
        this.bindEvent();
        this.wrapper.style.display ='block';
    }

    bindEvent() {
        this.setElems();
        this.closeBtn.addEventListener('click', this.close.bind(this));
    }

    setElems() {
        this.closeBtn = this.wrapper.querySelector('.j-close-popup');
        this.likeBtn = this.wrapper.querySelector('.j-like');
        this.downloadBtn = this.wrapper.querySelector('.j-download');
        this.template = '';
    }

    setTemplate(data) {
        this.template = `
            <div class="popup__close j-close-popup">
                Close
            </div>
            <div class="popup__img">
                <img src="${data.url}" alt="">
            </div>
            <div class="popup__dscr">
                <div class="popup__dscr-info">${data.dscr}</div>
                <div class="popup__dscr-info">date: ${data.date}</div>
                <div class="popup__dscr-info">downloads: ${data.downloads}</div>
                <div class="popup__dscr-info">likes: ${data.likes}<div class="popup__like-icon j-like"></div></div>
                <div class="popup__dscr-info"><a href="${data.link}" download>Download<div class="popup__download-icon j-download"></div></a></div>
            </div>
        `;
    }

    close() {
        this.wrapper.style.display = 'none';
    }
}