var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../lib/CreateJS.d.ts" />
var view;
(function (view) {
    var StageView = (function (_super) {
        __extends(StageView, _super);
        function StageView(model) {
                _super.call(this);
            this.model = model;
        }
        StageView.prototype.loadResource = function () {
            this.loadedResource();
        };
        StageView.prototype.loadedResource = function () {
        };
        return StageView;
    })(createjs.EventDispatcher);
    view.StageView = StageView;    
})(view || (view = {}));
//@ sourceMappingURL=StageView.js.map
