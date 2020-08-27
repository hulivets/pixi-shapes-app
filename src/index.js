import View from './view';
import Model from './model'
import Controller from './controller';

import './assets/styles/style.css'

function init() {
    const view = new View();
    const model = new Model();
    const controller = new Controller(view, model);

    // Init controller
    controller.init();
}

init();
