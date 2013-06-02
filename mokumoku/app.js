/// <reference path="control/StageController.ts" />
var App = (function () {
    function App(stageID) {
        this.controller = new control.StageController("myCanvas", stageID);
    }
    return App;
})();
var EditApp = (function () {
    function EditApp() {
        this.controller = new control.StageController("myCanvas", 1);
    }
    return EditApp;
})();
//@ sourceMappingURL=app.js.map
