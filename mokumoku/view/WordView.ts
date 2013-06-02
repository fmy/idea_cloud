/// <reference path="../events/Event.ts" />
/// <reference path="../model/word.ts" />
/// <reference path="../control/StageController.ts" />
/// <reference path="../lib/CreateJS.d.ts" />

module view {
    export class WordView extends createjs.Container {
        dataID: number;
        text: createjs.Text;
        shape: createjs.Shape;
        private size: number = 50;
       
        constructor(word: model.WordData) {
            super();
            this.shape = new createjs.Shape();
            this.text = new createjs.Text();
            this.addChild(this.shape);
            this.addChild(this.text);
            this.dataID = word.id;
            this.toDraw();
            this.name = word.id.toString();
            this.addEventListener("mousedown", (e: createjs.MouseEvent) => { this.startDrag(e) });
            this.addEventListener("mouseup", this.stopDrag);
        }

        dragPoint: createjs.Point = null;
        startDrag(e: createjs.MouseEvent): void {
            e.addEventListener("mousemove", this.drag);
        }

        stopDrag(eventObject:createjs.MouseEvent) {
            this.removeEventListener("mousemove", this.drag);
            this.removeEventListener("mouseup", this.stopDrag);
        }

        drag(eventObject) {
            var instance = eventObject.target;
            instance.x = eventObject.stageX;
            instance.y = eventObject.stageY;
            instance.update();
        }

        update(): void {

        }

        private getData():model.WordData {
            return control.StageController.getInstance().model.getWord(this.dataID);
        }

        getSize(): number {
            return this.size;
        }

        private toDraw(): void {
            this.shape.graphics.beginFill("#ff0000");
            this.shape.graphics.drawCircle(this.size, this.size, this.size);
            this.text.text = this.getData().name;
            this.text.x = this.size - this.text.getMeasuredWidth() / 2;
            this.text.y = this.size - this.text.getMeasuredHeight() / 2;
        }

        private press(e: MouseEvent): void {
            
        }
    }
}