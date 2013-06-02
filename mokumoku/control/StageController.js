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
            var _this = this;
                _super.call(this);
            this.canvasID = canvasID;
            this.stageID = stageID;
            StageController.instance = this;
            createjs.Ticker.setFPS(30);
            this.model = new model.StageModel(this.stageID);
            this.view = new view.StageView(this.model, this.canvasID);
            this.view.addEventListener("draged", function (e) {
                _this.wordConnect(e.dragObject, e.dragTarget);
            });
            this.preLoad();
        }
        StageController.getInstance = function getInstance() {
            return StageController.instance;
        };
        StageController.prototype.wordConnect = function (wordA, wordB) {
            if(this.model.isConnect(wordA, wordB)) {
                this.view.connectWord(wordA, wordB);
            } else if(this.model.isDisConnect(wordA, wordB)) {
                this.view.disConnectWord(wordA, wordB);
            } else {
                this.view.noConnectWord(wordA);
            }
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
        return StageController;
    })(createjs.EventDispatcher);
    control.StageController = StageController;    
})(control || (control = {}));
//@ sourceMappingURL=StageController.js.map
