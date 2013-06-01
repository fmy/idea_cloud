/// <reference path="../view/StageView.ts" />
/// <reference path="../model/StageModel.ts" />
var control;
(function (control) {
    var StageController = (function () {
        function StageController() {
            this.model = new model.StageModel();
            this.view = new view.StageView(this.model);
            this.init();
        }
        StageController.prototype.init = function () {
            this.model.loadResource();
        };
        return StageController;
    })();
    control.StageController = StageController;    
})(control || (control = {}));
//@ sourceMappingURL=StageController.js.map
