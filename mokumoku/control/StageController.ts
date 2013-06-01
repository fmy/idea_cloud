/// <reference path="../view/StageView.ts" />
/// <reference path="../model/StageModel.ts" />
module control {
    export class StageController {
        view: view.StageView;
        model: model.StageModel;
        constructor() {
            this.model = new model.StageModel();
            this.view = new view.StageView(this.model);
        }
    }
}