var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var control;
(function (control) {
    var StageController = (function (_super) {
        __extends(StageController, _super);
        function StageController() {
                _super.call(this);
            this.preLoad();
        }
        StageController.prototype.preLoad = function () {
            var _this = this;
            this.model = new model.StageModel();
            this.model.addEventListener(events.Event.COMPLETE, function (e) {
                _this.view.loadResource();
            });
            this.view = new view.StageView(this.model);
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
