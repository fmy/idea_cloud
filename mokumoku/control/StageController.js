var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="../view/StageView.ts" />
/// <reference path="../model/StageModel.ts" />
var control;
(function (control) {
    var StageController = (function (_super) {
        __extends(StageController, _super);
        function StageController() {
            this.model = new model.StageModel();
            this.view = new view.StageView(this.model);
            this.init();
        }
        StageController.prototype.init = function () {
            this.model.loadResource();
        };
        return StageController;
    })(createjs.EventDispatcher);
    control.StageController = StageController;    
})(control || (control = {}));
//@ sourceMappingURL=StageController.js.map
