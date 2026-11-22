// CONTROLLER: посередник між моделлю та в'ю.
// Модель і в'ю одне про одного не знають – усю взаємодію між ними організовує контролер.
import ModelMovies from './model_movies.js';
import ViewMovies from './view_movies.js';

export default class ControllerMovies {

    constructor() {
        this.model = new ModelMovies();
        this.view = new ViewMovies();
        this.start();   // запускаємо роботу одразу після створення
    }

    start() {
        this.model.loadData()                                   // 1. запит за даними
            .then(text => this.model.parseData(text))           // 2. обробка даних
            .then(allData => this.view.renderData(allData))     // 3. візуалізація
            .catch(error => this.view.renderError(error.message));
    }
}
