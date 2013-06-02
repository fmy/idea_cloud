var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../events/Event.ts" />
/// <reference path="../model/word.ts" />
/// <reference path="../control/StageController.ts" />
/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="IntaractionConainer.ts" />
var view;
(function (view) {
    var WordView = (function (_super) {
        __extends(WordView, _super);
        function WordView(word) {
            var _this = this;
                _super.call(this);
            this.size = 50;
            this.shape = new createjs.Shape();
            this.text = new createjs.Text();
            this.addChild(this.shape);
            this.addChild(this.text);
            this.dataID = word.id;
            this.toDraw();
            this.name = word.id.toString();
            this.width = this.size * 2;
            this.height = this.size * 2;
            this.addEventListener("mousedown", function (e) {
                _this.dragPosition = new createjs.Point(_this.x, _this.y);
                _this.startDrag(e);
            });
        }
        WordView.prototype.resetDragPosition = function () {
            this.x = this.dragPosition.x;
            this.y = this.dragPosition.y;
        };
        WordView.prototype.getData = function () {
            return control.StageController.getInstance().model.getWord(this.dataID);
        };
        WordView.prototype.getSize = function () {
            return this.size;
        };
        WordView.prototype.toDraw = function () {
            this.shape.graphics.beginFill("#ff0000");
            this.shape.graphics.drawCircle(this.size, this.size, this.size);
            this.text.text = this.getData().name;
            this.text.x = this.size - this.text.getMeasuredWidth() / 2;
            this.text.y = this.size - this.text.getMeasuredHeight() / 2;
        };
        WordView.prototype.press = function (e) {
        };
        return WordView;
    })(view.IntaractionConainer);
    view.WordView = WordView;    
})(view || (view = {}));
//@ sourceMappingURL=WordView.js.map
