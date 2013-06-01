/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="../view/StageView.ts" />
/// <reference path="../model/StageModel.ts" />
module control {
    export class StageController extends createjs.EventDispatcher {
        view: view.StageView;
        model: model.StageModel;
        constructor() {
            this.model = new model.StageModel();
            this.view = new view.StageView(this.model);
            this.init();
        }

        private init(): void {
            this.model.loadResource();
        }
    }
}