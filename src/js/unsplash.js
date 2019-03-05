import Model from './model';
import Controller from './controller';
import View from './view';

export default class Unsplash {
    constructor() {
        this.view = new View;
        this.model = new Model;
        this.controller = new Controller({
            model: this.model,
            view: this.view
        });
    }
}