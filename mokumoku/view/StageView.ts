/// <reference path="../events/Event.ts" />
/// <reference path="WordView.ts" />
/// <reference path="../lib/CreateJS.d.ts" />
module view {
    
    export class StageView extends createjs.EventDispatcher {
        private stage: createjs.Stage;
        constructor(public model: model.StageModel, public stageID:string) {
            super();
            this.init();
        }

        private init(): void {
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(this.stageID);
            this.stage = new createjs.Stage(canvas);
            this.model.addEventListener(events.Event.COMPLETE, (e) => {
                this.update();
            });
            this.model.addEventListener(events.Event.CHANGE_PROPERTY, (e) => {
                this.update();
            });
        }

        loadResource():void{
            this.loadedResource();
        }

        update(): void {    
            var wordList: model.WordData[] = this.model.getWordList();
            console.log(wordList.length);
            for (var i: number = 0; i < wordList.length; i++) {
                var word: model.WordData = wordList[i];
                var xLength: number = Math.floor(this.stage.canvas.width / 120);
                var x: number = i % xLength;
                var y: number = Math.floor(i / xLength);
                var wordView:WordView = <WordView>this.stage.getChildByName(word.id.toString());
                if (wordView == null) {
                    wordView = new WordView(word);
                }
                wordView.x = x * 120;
                wordView.y = y * 120;
                console.log(word.name + " : " + wordView.x + " : " + wordView.y + " :: " + xLength);
                this.stage.addChild(wordView);
                wordView.update = () => {
                    this.stage.update();
                }
            }
            this.stage.update();
        }

        private loadedResource():void{
            this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
        }

    }
}