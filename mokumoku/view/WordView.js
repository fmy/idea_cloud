var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view;
(function (view) {
    var WordView = (function (_super) {
        __extends(WordView, _super);
        function WordView(word) {
            var _this = this;
                _super.call(this);
            this.size = 50;
            this.dragPoint = null;
            this.shape = new createjs.Shape();
            this.text = new createjs.Text();
            this.addChild(this.shape);
            this.addChild(this.text);
            this.dataID = word.id;
            this.toDraw();
            this.name = word.id.toString();
            this.addEventListener("mousedown", function (e) {
                _this.startDrag(e);
            });
            this.addEventListener("mouseup", this.stopDrag);
        }
        WordView.prototype.startDrag = function (e) {
            e.addEventListener("mousemove", this.drag);
        };
        WordView.prototype.stopDrag = function (eventObject) {
            this.removeEventListener("mousemove", this.drag);
            this.removeEventListener("mouseup", this.stopDrag);
        };
        WordView.prototype.drag = function (eventObject) {
            var instance = eventObject.target;
            instance.x = eventObject.stageX;
            instance.y = eventObject.stageY;
            instance.update();
        };
        WordView.prototype.update = function () {
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
    })(createjs.Container);
    view.WordView = WordView;    
})(view || (view = {}));
//@ sourceMappingURL=WordView.js.map
