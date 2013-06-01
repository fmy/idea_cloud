/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="../view/StageView.ts" />
/// <reference path="../model/StageModel.ts" />
module control {
    export class StageController extends createjs.EventDispatcher {
        view: view.StageView;
        model: model.StageModel;
        constructor(public stageID:string) {
            super();
            this.preLoad();
        }

        private preLoad(): void {
            this.model = new model.StageModel();
            
            this.model.addEventListener(events.Event.COMPLETE, (e: Event): void => {
                this.view.loadResource();
            });
            this.view = new view.StageView(this.model);
            this.view.addEventListener(events.Event.COMPLETE, (e: Event): void => {
                this.init();
            });

            this.model.loadResource();
        }

        private init(): void {

        }

          wordConnect(wordA:model.WordData, wordB:model.WordData): void{
              if(this.model.isConnect(wordA, wordB)) {

              }

           }

    }
}