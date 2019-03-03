import './../scss/style.scss';
import Unsplash from './unsplash';
import PerfectScrollbar from 'perfect-scrollbar';



//perfect scroll bar
(function(scrollBar) {
    const element = document.querySelector(scrollBar);
    if (!element) {
        return;
    }
    const ps = new PerfectScrollbar(element, {
        suppressScrollY: true
    });
    element.addEventListener('mouseover', () => {
        ps.update();
    })
})('.j-scroll-bar')

const unsplash = new Unsplash();