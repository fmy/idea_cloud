/// <reference path="../events/Event.ts" />
/// <reference path="WordView.ts" />
/// <reference path="ResourceManager.ts" />
/// <reference path="../lib/CreateJS.d.ts" />

module view {
    
    export class StageView extends createjs.EventDispatcher {
        private stage: createjs.Stage;
        private wordViewList: WordView[];
        private score: number;
        private effect: HTMLDivElement;
        private effectImg: HTMLImageElement;
        constructor(public model: model.StageModel, public stageID:string) {
            super();
            this.init();
            this.effect = <HTMLDivElement>document.createElement("div");
            this.effect.style.position = "absolute";
            this.effect.style.width = "100%";
            this.effect.style.height = "100%";
            this.effect.style.left = "0px"
            this.effect.style.top = "0px";
            this.effectImg = <HTMLImageElement> document.createElement("img");
            this.effect.appendChild(this.effectImg);
            this.effectImg.style.width = "100%";
            this.effectImg.style.height = "100%";
            this.effect.style.display = "none";

            document.body.appendChild(this.effect);
            createjs.Ticker.addEventListener("tick",  ()=> {
                this.stage.update(); // 30fpsでステージの描画が更新されるようになる
            });
        }

        private init(): void {
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(this.stageID);
            this.stage = new createjs.Stage(canvas);
            this.model.addEventListener(events.Event.COMPLETE, (e) => {
                this.firstCreate();
            });

            this.wordViewList = [];

            this.resource().addEventListener("complete", () => {
                this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
            });
            this.resource().load();

        }

        resource(): ResourceManager {
            return ResourceManager.getInstance();
        }

        loadResource():void{
            this.loadedResource();
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
            }
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

        private showEffect(id: string): void {
            var resource: any = {
                imgCon: "effect/con.png",
                imgBara: "effect/bara.png"
            };
            this.effect.style.display = "block";

            this.effectImg.src = resource[id];
            setTimeout(() => { this.hideEffect() }, 500);
        }

        private hideEffect(): void {
            this.effect.style.display = "none";
        }

        connectWord(wordA: model.WordData, wordB: model.WordData): void {
            this.showEffect("imgCon");
            this.resource().playSE("success0" + this.rand());
            this.model.connect(wordA.id, wordB.id);
        }

        disConnectWord(wordA: model.WordData, wordB: model.WordData): void {
            this.showEffect("imgBara");
            this.resource().playSE("fault0" + this.rand());
            this.model.disConnect(wordA.id, wordB.id);
        }

        noConnectWord(wordA: model.WordData): void {
            this.resource().playSE("no0" + this.rand());
            (<view.WordView>this.stage.getChildByName(wordA.id.toString())).resetDragPosition();
        }

    }
}