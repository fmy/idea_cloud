/// <reference path="control/StageController.ts" />
class App {
    controller: control.StageController;
    constructor(stageID:number) {
        this.controller = new control.StageController("myCanvas", stageID);
    }
}