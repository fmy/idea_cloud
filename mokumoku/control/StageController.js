var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var control;
(function (control) {
    var StageController = (function (_super) {
        __extends(StageController, _super);
        function StageController(canvasID, stageID) {
            if (typeof stageID === "undefined") { stageID = 1; }
                _super.call(this);
            this.canvasID = canvasID;
            this.stageID = stageID;
            StageController.instance = this;
            this.model = new model.StageModel(this.stageID);
            this.view = new view.StageView(this.model, this.canvasID);
            this.preLoad();
        }
        StageController.getInstance = function getInstance() {
            return StageController.instance;
        };
        StageController.prototype.preLoad = function () {
            var _this = this;
            this.model.addEventListener(events.Event.COMPLETE, function (e) {
                _this.view.loadResource();
            });
            this.view.addEventListener(events.Event.COMPLETE, function (e) {
                _this.init();
            });
            this.model.loadResource();
        };
        StageController.prototype.init = function () {
        };
        StageController.prototype.wordConnect = function (wordA, wordB) {
            if(this.model.isConnect(wordA, wordB)) {
            }
        };
        return StageController;
    })(createjs.EventDispatcher);
    control.StageController = StageController;    
})(control || (control = {}));
//@ sourceMappingURL=StageController.js.map
