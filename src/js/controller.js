export default class Controller {
    constructor( {model, view} ) {

        this.model = model;
        this.view = view;
        this.data = {};
        
        this.init();
        this.view.on('showPhotos', (id) => {
            this.data.page = 1;
            this.data.id = id;
            this.data.state = 'photos';
            const photos = this.model.getData(`collections/${id}/photos`);
            this.view.renderSelectCollection(photos);
        });
        this.view.on('showMore', () => {
            if (this.data.state === 'photos') {
                const photos = this.model.getData(`collections/${this.data.id}/photos?page=${++this.data.page}`);
                this.view.updateSelectCollection(photos);
            }
        })
    }

    init() {
        this.data.page = 1;
        this.data.featured = this.model.getData('collections/featured');
        this.data.collections = this.model.getData('collections');
        this.view.renderTitles(this.data.featured);
        this.view.renderColections(this.data.collections);
    }
}