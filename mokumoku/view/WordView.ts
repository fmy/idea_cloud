/// <reference path="../events/Event.ts" />
/// <reference path="../model/word.ts" />
/// <reference path="../control/StageController.ts" />
/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="IntaractionConainer.ts" />

module view {
    export class WordView extends IntaractionConainer {
        dataID: number;
        text: createjs.Text;
        kumo: createjs.Bitmap;
        private size: number = 50;
        private dragPosition: createjs.Point;
        constructor(word: model.WordData) {
            super();
            this.kumo = ResourceManager.getInstance().getKumo();
            this.text = new createjs.Text("", "20px");
            
            this.addChild(this.kumo);
            this.addChild(this.text);
            this.dataID = word.id;
            this.toDraw();
            this.name = word.id.toString();
            this.width = this.size * 2;
            this.height = this.size * 2;
            this.addEventListener("mousedown", (e: createjs.MouseEvent) => {
                this.dragPosition = new createjs.Point(this.x, this.y);
                this.startDrag(e);
            });
        }
        resetDragPosition(): void {
            this.x = this.dragPosition.x;
            this.y = this.dragPosition.y;
        }

        getData():model.WordData {
            return control.StageController.getInstance().model.getWord(this.dataID);
        }

        getSize(): number {
            return this.size;
        }

        private toDraw(): void {
            //this.kumo.graphics.beginFill("#ff0000");
            //this.kumo.graphics.drawCircle(this.size, this.size, this.size);
            this.text.text = this.getData().name;
            this.text.x = this.size - this.text.getMeasuredWidth() / 2;
            this.text.y = this.size - this.text.getMeasuredHeight() / 2;
        }

        private press(e: MouseEvent): void {
            
        }
    }
}