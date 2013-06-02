/// <reference path="control/StageController.ts" />
class App {
    controller: control.StageController;
    constructor(stageID:number) {
        this.controller = new control.StageController("myCanvas", stageID);
    }
}

class EditApp {
    controller: control.StageController;
    constructor() {
        this.controller = new control.StageController("myCanvas", 1);
    }
}