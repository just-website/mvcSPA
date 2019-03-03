import Model from './model';
import Controller from './controller';
import View from './view';

export default class Unsplash {
    constructor() {
        this.emitter = new EventEmitter;
        this.view = new View;
        this.model = new Model(emitter);
        this.controller = new Controller({
            model: this.model,
            view: this.view
        });
        this.state = {};
    }

    init() {
        this.view.init();
    }

}