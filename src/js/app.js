import './../scss/style.scss';
import Unsplash from './unsplash';
import PerfectScrollbar from 'perfect-scrollbar';

const unsplash = new Unsplash();


//perfect scroll bar
(function(scrollBar) {
    const element = document.querySelector(scrollBar);
    if (!element) {
        return;
    }
    const ps = new PerfectScrollbar(element, {
        suppressScrollY: true
    });
})('.j-scroll-bar')