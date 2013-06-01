/// <reference path="../events/Event.ts" />
/// <reference path="../model/word.ts" />
/// <reference path="../lib/CreateJS.d.ts" />

module view {
    export class WordView extends createjs.Shape {
        constructor(word: model.WordData) {
            super();
        }

        draw(): void {
            this.graphics.drawCircle(0, 0, 100);
        }
    }
}