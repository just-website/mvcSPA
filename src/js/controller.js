export default class Controller {
    constructor({ model, view}) {
        this.model = model;
        this.view = view;
        this.data = {};
    }

    

    render(data, elem) {
        elem.render(data);
    }

    init() {

    }

}