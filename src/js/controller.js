export default class Controller {
    constructor( {model, view} ) {

        this.model = model;
        this.view = view;
        this.data = {};
        
        this.init();

        this.view.on('goBack', () => {
            this.init();
        });

        this.view.on('showPhotos', async (id) => {
            this.data.page = 1;
            this.data.id = id;
            this.data.state = 'photos';
            const photos = await this.model.getData(`collections/${id}/photos`);
            this.totalPhotos = await this.model.getData(`collections/${id}/`).then(data => data.total_photos);
            this.view.renderSelectCollection(photos);
        });

        this.view.on('showMore', async () => {
            if (this.data.state === 'photos') {
                this.data.photos = await this.model.getData(`collections/${this.data.id}/photos?page=${++this.data.page}`);
                this.view.updateSelectPhotos(this.data.photos);
                if (this.checkPhotoCount()) { // проверяем, что ещё есть что подгружать
                    this.view.hideElem(this.view.moreBtn);
                }
            } else if (this.data.state === 'collections') {
                this.data.collections = await this.model.getData(`collections?page=${++this.data.page}`);
                this.view.updateCollections(this.data.collections);
            }
        });

        this.view.on('showFullImg', async (id) => {
            this.data.photo = await this.model.getData(`/photos/${id}/`)
            const data = { id: this.data.photo.id, url: this.data.photo.urls.regular, dscr: this.data.photo.description, downloads: this.data.photo.downloads, likes: this.data.photo.likes, date: this.data.photo.created_at, link: this.data.photo.links.download};
            this.view.showFullImg(data);
        });
    }

    async init() {
        this.data.page = 1;
        this.data.featured = await this.model.getData('collections/featured');
        this.data.collections = await this.model.getData('collections');
        this.data.state = 'collections';
        this.view.renderTitles(this.data.featured);
        this.view.renderColections(this.data.collections);
        this.view.showElem(this.view.moreBtn);
    }

    checkPhotoCount() {
        return this.data.page > Math.floor(this.totalPhotos / 10);
    }
}