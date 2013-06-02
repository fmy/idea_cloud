/// <reference path="../events/Event.ts" />
/// <reference path="WordView.ts" />
/// <reference path="SoundManager.ts" />
/// <reference path="../lib/CreateJS.d.ts" />

module view {
    
    export class StageView extends createjs.EventDispatcher {
        private stage: createjs.Stage;
        private wordViewList: WordView[];
        private score: number;
        constructor(public model: model.StageModel, public stageID:string) {
            super();
            this.init();
        }

        private init(): void {
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(this.stageID);
            this.stage = new createjs.Stage(canvas);
            this.model.addEventListener(events.Event.COMPLETE, (e) => {
                this.firstCreate();
            });
            this.model.addEventListener(events.Event.CHANGE_PROPERTY, (e) => {
                this.update();
            });

            this.wordViewList = [];

            this.sound().addEventListener("complete", () => {
                this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
            });
            this.sound().load();

        }

        sound(): SoundManager {
            return SoundManager.getInstance();
        }

        loadResource():void{
            this.loadedResource();
        }

        private update(): void {
            this.stage.update();
        }

        firstCreate(): void {    
            var wordList: model.WordData[] = this.model.getWordList();
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
                this.wordViewList.push(wordView);
                wordView.dragEnd = (target:WordView) => {
                    this.woedDraged(target);
                }
                wordView.update = () => { this.update() };
            }
            this.update();
        }

        private loadedResource(): void {
            
            
        }

        private woedDraged(target: WordView): void {
            var result: model.WordData;
            for (var i: number = 0; i < this.wordViewList.length; i++) {
                var wordView: WordView = this.wordViewList[i];
                if (target == wordView) {
                    continue;
                }
                var position: createjs.Point = wordView.globalToLocal(this.stage.mouseX, this.stage.mouseY);
                if (wordView.hitTest(position.x, position.y)) {
                    result = wordView.getData();
                    break;
                }
                console.log(result);
            }
            if (result) {
                this.dispatchEvent({ type: "draged",dragObject:target.getData(), dragTarget: result }, this);
            }
        }

        private rand(): number {
            var rand: number = (Math.round(Math.random() * 3));
            return rand;
        }

        connectWord(wordA: model.WordData, wordB: model.WordData): void {
            this.sound().playSE("success0" + this.rand());
            this.model.connect(wordA.id, wordB.id);
        }

        disConnectWord(wordA: model.WordData, wordB: model.WordData): void {
            this.sound().playSE("fault0" + this.rand());
            this.model.disConnect(wordA.id, wordB.id);
        }

        noConnectWord(wordA: model.WordData): void {
            this.sound().playSE("no0" + this.rand());
            (<view.WordView>this.stage.getChildByName(wordA.id.toString())).resetDragPosition();
        }

    }
}