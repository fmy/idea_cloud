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
            var _this = this;
                _super.call(this);
            this.model = model;
            this.stageID = stageID;
            this.init();
            createjs.Ticker.addEventListener("tick", function () {
                _this.score.innerText = _this.model.getScore().toString();
                _this.stage.update();
            });
        }
        StageView.prototype.craeteEffect = function () {
            this.effect = document.createElement("div");
            this.effect.style.position = "absolute";
            this.effect.style.width = "100%";
            this.effect.style.height = "100%";
            this.effect.style.left = "0px";
            this.effect.style.top = "0px";
            this.effectImg = document.createElement("img");
            this.effect.appendChild(this.effectImg);
            this.effectImg.style.width = "100%";
            this.effectImg.style.height = "100%";
            this.effect.style.display = "none";
            document.body.appendChild(this.effect);
        };
        StageView.prototype.createScore = function () {
            this.score = document.createElement("div");
            this.score.style.position = "absolute";
            this.score.style.right = "5px";
            this.score.style.top = "5px";
            this.score.style.fontSize = "30px";
            document.body.appendChild(this.score);
        };
        StageView.prototype.init = function () {
            var _this = this;
            var canvas = document.getElementById(this.stageID);
            this.stage = new createjs.Stage(canvas);
            this.model.addEventListener(events.Event.COMPLETE, function (e) {
                _this.firstCreate();
            });
            this.wordViewList = [];
            this.craeteEffect();
            this.createScore();
            this.resource().addEventListener("complete", function () {
                _this.dispatchEvent(new events.Event(events.Event.COMPLETE), _this);
            });
            this.resource().load();
        };
        StageView.prototype.resource = function () {
            return view.ResourceManager.getInstance();
        };
        StageView.prototype.loadResource = function () {
            this.loadedResource();
        };
        StageView.prototype.firstCreate = function () {
            var _this = this;
            var wordList = this.model.getWordList();
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
            }
        };
        StageView.prototype.loadedResource = function () {
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
        StageView.prototype.rand = function () {
            var rand = (Math.round(Math.random() * 3));
            return rand;
        };
        StageView.prototype.showEffect = function (id) {
            var _this = this;
            var resource = {
                imgCon: "effect/con.png",
                imgBara: "effect/bara.png"
            };
            this.effect.style.display = "block";
            this.effectImg.src = resource[id];
            setTimeout(function () {
                _this.hideEffect();
            }, 500);
        };
        StageView.prototype.hideEffect = function () {
            this.effect.style.display = "none";
        };
        StageView.prototype.connectWord = function (wordA, wordB) {
            this.showEffect("imgCon");
            this.resource().playSE("success0" + this.rand());
            this.model.connect(wordA.id, wordB.id);
        };
        StageView.prototype.disConnectWord = function (wordA, wordB) {
            this.showEffect("imgBara");
            this.resource().playSE("fault0" + this.rand());
            this.model.disConnect(wordA.id, wordB.id);
        };
        StageView.prototype.noConnectWord = function (wordA) {
            this.resource().playSE("no0" + this.rand());
            (this.stage.getChildByName(wordA.id.toString())).resetDragPosition();
        };
        return StageView;
    })(createjs.EventDispatcher);
    view.StageView = StageView;    
})(view || (view = {}));
//@ sourceMappingURL=StageView.js.map
