import { Application, Rectangle } from 'pixi.js';

import {
    getElementById,
    getShapesArea,
} from '../assets/utils/utils';
export default class View {
    constructor() {
        if (View.isExists) return View.instance;

        View.instance = this;
        View.isExists = true;
        this.element = getElementById('pixi-shapes');
        this.app = new Application({
            view: this.element,
            height: 500,
            resolution: window.devicePixelRatio,
            backgroundColor: 0xFFFFFF
        });
        this.PIXELS_PER_METER = this.app.screen.width / 1000;
    }

    // Init stage
    init() {
        this.app.stage.hitArea = new Rectangle(0, 0 , this.app.screen.width, this.app.screen.height);
        this.app.stage.interactive = true;
        this.app.stage.buttonMode = true;

        // Init ticker
        this.app.ticker.add(delta => this.animateFalling(delta));
    }

    showShapesQuantity() {
        const { children } = this.app.stage;

        if (!this.shapesQuantity) this.shapesQuantity = getElementById('shapes-quantity');

        this.shapesQuantity.textContent = children.length;
    }

    showShapesArea() {
        const { children } = this.app.stage;

        if (!this.shapesArea) this.shapesArea = getElementById('shapes-area');

        this.shapesArea.textContent = Math.floor(getShapesArea(children));
    }

    showGravity(value) {
        const element = getElementById('gravity-input');

        element.value = `Gravity value: ${value}`;
    }

    showShapesPerSecond(value) {
        const element = getElementById('shapes-per-second-input');

        element.value = `Shapes per second: ${value}`;
    }

    getAppWidth() {
        return this.app.screen.width;
    }

    // Get stage
    getCanvasElement() {
        return this.app.stage;
    }

    updateGravity(gravity) {
        this.gravity = gravity;
    }

    // Change shapes fill, after the same shape type was removed
    changeFillByType(type) {
        const { children } = this.app.stage;
        if (!children.length) return;

        const childrenFiltered = children.filter(shape => shape.type === type);

        childrenFiltered.forEach(child => child.tint = Math.random() * 0xFFFFFF);
    }

    // Animate shapes falling
    animateFalling(delta) {
        const { children } = this.app.stage;
        if (!children.length) return;

        children.forEach(shape => {
            // Check if shape isn't in sight
            if (shape.position.y - 120 > this.app.renderer.height / this.app.renderer.resolution) {
                shape.destroy();
                this.showShapesQuantity();
                this.showShapesArea();

                return
            }

            // increase gravity, posY values
            shape.vY += this.gravity * delta * this.PIXELS_PER_METER;
            shape.position.y += shape.vY / (1000 / delta);
        })
    }

    // Render new shapes, update shapes quantity and area
    renderShapes(shapesList = []) {
        shapesList.forEach(shape => {
            this.app.stage.addChild(shape);
            this.showShapesQuantity();
            this.showShapesArea();
        });
    }
}
