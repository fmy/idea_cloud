var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../lib/CreateJS.d.ts" />
var view;
(function (view) {
    var IntaractionConainer = (function (_super) {
        __extends(IntaractionConainer, _super);
        function IntaractionConainer() {
            _super.apply(this, arguments);

            this.width = 0;
            this.height = 0;
        }
        IntaractionConainer.prototype.startDrag = function (e) {
            e.addEventListener("mousemove", this.move);
            e.addEventListener("mouseup", this.stopDrag);
        };
        IntaractionConainer.prototype.move = function (e) {
            var instance = e.target;
            instance.x = e.stageX - instance.width / 2;
            instance.y = e.stageY - instance.height / 2;
            instance.update();
        };
        IntaractionConainer.prototype.stopDrag = function (e) {
            e.removeEventListener("mouseup", this.stopDrag);
            e.removeEventListener("mousemove", this.move);
            (e.target).dragEnd(e.target);
        };
        IntaractionConainer.prototype.update = function () {
        };
        IntaractionConainer.prototype.dragEnd = function (targert) {
        };
        return IntaractionConainer;
    })(createjs.Container);
    view.IntaractionConainer = IntaractionConainer;    
})(view || (view = {}));
//@ sourceMappingURL=IntaractionConainer.js.map
