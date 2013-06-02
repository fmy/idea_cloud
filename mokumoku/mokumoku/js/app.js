var events;
(function (events) {
    var Event = (function () {
        function Event(type, value) {
            if (typeof type === "undefined") { type = null; }
            if (typeof value === "undefined") { value = null; }
            this.type = type;
            this.value = value;
        }
        Event.COMPLETE = "complete";
        Event.CHANGE_PROPERTY = "changeProperty";
        return Event;
    })();
    events.Event = Event;    
})(events || (events = {}));
var model;
(function (model) {
    var WordData = (function () {
        function WordData(id, name) {
            this.id = id;
            this.name = name;
        }
        return WordData;
    })();
    model.WordData = WordData;    
})(model || (model = {}));
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
var model;
(function (model) {
    var StageModel = (function (_super) {
        __extends(StageModel, _super);
        function StageModel(stage_id) {
                _super.call(this);
            this.stage_id = stage_id;
            this.wordList = [];
        }
        StageModel.prototype.getWordList = function () {
            return this.wordList;
        };
        StageModel.prototype.getWord = function (wordID) {
            return null;
        };
        StageModel.prototype.isConnect = function (wordA, wordB) {
            return true;
        };
        StageModel.prototype.isDisConect = function (wordA, wordB) {
            return true;
        };
        StageModel.prototype.wordConnect = function (wordA, wordB) {
            return true;
        };
        StageModel.prototype.loadResource = function () {
            var _this = this;
            var data = '{"id": 1,"name": "level1","words": [{"id": 1,"name": "ã”ã¯ã‚“"},{"id": 2,"name": "ãŸã‚‰ã“"},{"id": 3,"name": "ãƒ‘ã‚¹ã‚¿"},{"id": 4,"name": "ã¿ãæ±"}]}';
            JSON.parse(data).words.each(function (word) {
                var w = new model.WordData(word.id, word.name);
                _this.wordList.push(w);
            });
            this.loadedResource();
        };
        StageModel.prototype.loadedResource = function () {
            this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
        };
        return StageModel;
    })(createjs.EventDispatcher);
    model.StageModel = StageModel;    
})(model || (model = {}));
var control;
(function (control) {
    var StageController = (function (_super) {
        __extends(StageController, _super);
        function StageController(canvasID, stageID) {
            if (typeof stageID === "undefined") { stageID = 1; }
                _super.call(this);
            this.canvasID = canvasID;
            this.stageID = stageID;
            StageController.instance = this;
            this.model = new model.StageModel(this.stageID);
            this.view = new view.StageView(this.model, this.canvasID);
            this.preLoad();
        }
        StageController.getInstance = function getInstance() {
            return StageController.instance;
        };
        StageController.prototype.preLoad = function () {
            var _this = this;
            this.model.addEventListener(events.Event.COMPLETE, function (e) {
                _this.view.loadResource();
            });
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
var App = (function () {
    function App() {
        this.controller = new control.StageController("myCanvas");
    }
    return App;
})();
