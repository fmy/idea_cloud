/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="../view/StageView.ts" />
/// <reference path="../model/StageModel.ts" />
module control {
    export class StageController extends createjs.EventDispatcher {
        static private instance: StageController;
        static getInstance(): StageController {
            return StageController.instance;
        }

        view: view.StageView;
        model: model.StageModel;

        constructor(public canvasID:string, public stageID:number=1) {
            super();
            StageController.instance = this;
            createjs.Ticker.setFPS(30);
            this.model = new model.StageModel(this.stageID);
            this.view = new view.StageView(this.model, this.canvasID);
            this.view.addEventListener("draged", (e: any): void => {
                this.wordConnect(e.dragObject, e.dragTarget);
            });
            this.preLoad();
        }

        wordConnect(wordA:model.WordData, wordB:model.WordData): void {
            if (this.model.isConnect(wordA, wordB)) {
                this.view.connectWord(wordA, wordB);
            } else if (this.model.isDisConnect(wordA, wordB)) {
                this.view.disConnectWord(wordA, wordB);
            } else {
                this.view.noConnectWord(wordA);
            }
        }

        private preLoad(): void {
            this.model.addEventListener(events.Event.COMPLETE, (e: Event): void => {
                this.view.loadResource();
            });
            
            this.view.addEventListener(events.Event.COMPLETE, (e: Event): void => {
                this.init();
            });

            this.model.loadResource();
        }

        private init(): void {
            
        }

    }
}