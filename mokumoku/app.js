/// <reference path="control/StageController.ts" />
var App = (function () {
    function App() {
        this.controller = new control.StageController();
    }
    return App;
})();
window.onload = function () {
    new App();
};
//@ sourceMappingURL=app.js.map
