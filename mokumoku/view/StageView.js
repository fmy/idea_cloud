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
            this.stage = new createjs.Stage(canvas);
            this.model.addEventListener(events.Event.COMPLETE, function (e) {
                _this.firstCreate();
            });
            this.model.addEventListener(events.Event.CHANGE_PROPERTY, function (e) {
                _this.update();
            });
            this.wordViewList = [];
        };
        StageView.prototype.loadResource = function () {
            this.loadedResource();
        };
        StageView.prototype.update = function () {
            this.stage.update();
        };
        StageView.prototype.firstCreate = function () {
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
                this.wordViewList.push(wordView);
                wordView.dragEnd = function (target) {
                    _this.woedDraged(target);
                };
                wordView.update = function () {
                    _this.update();
                };
            }
            this.update();
        };
        StageView.prototype.loadedResource = function () {
            var _this = this;
            var queue = new createjs.LoadQueue(false);
            var manifest = [
                {
                    id: "success01",
                    src: "se/con1.mp3"
                }, 
                {
                    id: "success02",
                    src: "se/con2.mp3"
                }, 
                {
                    id: "success01",
                    src: "se/con3.mp3"
                }
            ];
            queue.installPlugin(createjs.Sound);
            queue.loadManifest(manifest, true);
            queue.addEventListener("complete", function (e) {
                _this.dispatchEvent(new events.Event(events.Event.COMPLETE), _this);
            });
        };
        StageView.prototype.woedDraged = function (target) {
            var result;
            for(var i = 0; i < this.wordViewList.length; i++) {
                var wordView = this.wordViewList[i];
                if(target == wordView) {
                    continue;
                }
                var position = wordView.globalToLocal(this.stage.mouseX, this.stage.mouseY);
                if(wordView.hitTest(position.x, position.y)) {
                    result = wordView.getData();
                    break;
                }
                console.log(result);
            }
            if(result) {
                this.dispatchEvent({
                    type: "draged",
                    dragObject: target.getData(),
                    dragTarget: result
                }, this);
            }
        };
        StageView.prototype.connectWord = function (wordA, wordB) {
            console.log("kuttuki");
        };
        StageView.prototype.disConnectWord = function (wordA, wordB) {
            console.log("barabara");
        };
        StageView.prototype.noConnectWord = function (wordA) {
            (this.stage.getChildByName(wordA.id.toString())).resetDragPosition();
        };
        return StageView;
    })(createjs.EventDispatcher);
    view.StageView = StageView;    
})(view || (view = {}));
//@ sourceMappingURL=StageView.js.map
