var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view;
(function (view) {
    var StageView = (function (_super) {
        __extends(StageView, _super);
        function StageView(model, stageID) {
                _super.call(this);
            this.model = model;
            this.stageID = stageID;
            this.init();
        }
        StageView.prototype.init = function () {
            var _this = this;
            var canvas = document.getElementById(this.stageID);
            this.stage = new createjs.Stage(canvas);
            this.model.addEventListener(events.Event.COMPLETE, function (e) {
                _this.update();
            });
            this.model.addEventListener(events.Event.CHANGE_PROPERTY, function (e) {
                _this.update();
            });
        };
        StageView.prototype.loadResource = function () {
            this.loadedResource();
        };
        StageView.prototype.update = function () {
            var _this = this;
            var wordList = this.model.getWordList();
            console.log(wordList.length);
            for(var i = 0; i < wordList.length; i++) {
                var word = wordList[i];
                var xLength = Math.floor(this.stage.canvas.width / 120);
                var x = i % xLength;
                var y = Math.floor(i / xLength);
                var wordView = this.stage.getChildByName(word.id.toString());
                if(wordView == null) {
                    wordView = new view.WordView(word);
                }
                wordView.x = x * 120;
                wordView.y = y * 120;
                console.log(word.name + " : " + wordView.x + " : " + wordView.y + " :: " + xLength);
                this.stage.addChild(wordView);
                wordView.update = function () {
                    _this.stage.update();
                };
            }
            this.stage.update();
        };
        StageView.prototype.loadedResource = function () {
            this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
        };
        return StageView;
    })(createjs.EventDispatcher);
    view.StageView = StageView;    
})(view || (view = {}));
//@ sourceMappingURL=StageView.js.map
