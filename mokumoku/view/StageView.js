var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../events/Event.ts" />
/// <reference path="WordView.ts" />
/// <reference path="../lib/CreateJS.d.ts" />
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
            canvas.style.width = document.body.clientWidth + "px";
            canvas.style.height = document.body.clientHeight + "px";
            this.stage = new createjs.Stage(canvas);
            this.model.addEventListener(events.Event.COMPLETE, function (e) {
                _this.update();
            });
            this.model.addEventListener(events.Event.CHANGE_PROPERTY, function (e) {
                _this.update();
            });
            this.wordViewList = [];
            this.wordViewHash = {
            };
        };
        StageView.prototype.loadResource = function () {
            this.loadedResource();
        };
        StageView.prototype.update = function () {
            var wordList = this.model.getWordList();
            for(var i = 0; i < wordList.length; i++) {
                var word = wordList[i];
                if(this.wordViewHash[word.id] == null) {
                    this.wordViewHash[word.id] = word;
                    wordList.push(word);
                    this.stage.addChild(new view.WordView(word));
                }
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
