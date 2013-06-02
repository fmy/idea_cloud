var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../events/Event.ts" />
/// <reference path="../model/word.ts" />
/// <reference path="../control/StageController.ts" />
/// <reference path="../lib/CreateJS.d.ts" />
var view;
(function (view) {
    var WordView = (function (_super) {
        __extends(WordView, _super);
        function WordView(word) {
                _super.call(this);
            this.shape = new createjs.Shape();
            this.text = new createjs.Text();
        }
        WordView.prototype.getData = function () {
            return control.StageController.getInstance().model.getWord(this.dataID);
        };
        WordView.prototype.draw = function () {
            this.shape.graphics.beginFill("#ff0000");
            this.shape.graphics.drawCircle(0, 0, 100);
            this.text.text = this.getData().name;
        };
        return WordView;
    })(createjs.Container);
    view.WordView = WordView;    
})(view || (view = {}));
//@ sourceMappingURL=WordView.js.map
