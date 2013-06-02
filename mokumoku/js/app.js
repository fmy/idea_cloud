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
var model;
(function (model) {
    var StageModel = (function (_super) {
        __extends(StageModel, _super);
        function StageModel(stageID) {
                _super.call(this);
            this.stageID = stageID;
            this.wordList = [];
            this.wordHash = {
            };
        }
        StageModel.prototype.getWordList = function () {
            return this.wordList;
        };
        StageModel.prototype.getWord = function (wordID) {
            return this.wordHash[wordID];
        };
        StageModel.prototype.isConnect = function (wordA, wordB) {
            var result = false;
            for(var prop in this.connections) {
                var connection = this.connections[prop];
                if(connection.first_id == wordA.id && connection.second_id == wordB.id) {
                    if(connection.status == 1) {
                        result = true;
                    }
                    break;
                }
            }
            return result;
        };
        StageModel.prototype.isDisConnect = function (wordA, wordB) {
            var result = false;
            for(var prop in this.connections) {
                var connection = this.connections[prop];
                if(connection.first_id == wordA.id && connection.second_id == wordB.id) {
                    if(connection.status == -1) {
                        result = true;
                    }
                    break;
                }
            }
            return result;
        };
        StageModel.prototype.wordConnect = function (wordA, wordB) {
            return true;
        };
        StageModel.prototype.loadResource = function () {
            var _this = this;
            var json = {
                "id": 1,
                "name": "level1",
                "words": [
                    {
                        "id": 1,
                        "name": "ごはん"
                    }, 
                    {
                        "id": 2,
                        "name": "たらこ"
                    }, 
                    {
                        "id": 3,
                        "name": "パスタ"
                    }, 
                    {
                        "id": 4,
                        "name": "みそ汁"
                    }
                ],
                "connections": [
                    {
                        "first_id": 1,
                        "second_id": 2,
                        "status": 1
                    }, 
                    {
                        "first_id": 1,
                        "second_id": 3,
                        "status": -1
                    }, 
                    {
                        "first_id": 1,
                        "second_id": 4,
                        "status": 1
                    }, 
                    {
                        "first_id": 2,
                        "second_id": 1,
                        "status": 1
                    }, 
                    {
                        "first_id": 2,
                        "second_id": 3,
                        "status": 1
                    }, 
                    {
                        "first_id": 2,
                        "second_id": 4,
                        "status": 0
                    }, 
                    {
                        "first_id": 3,
                        "second_id": 1,
                        "status": -1
                    }, 
                    {
                        "first_id": 3,
                        "second_id": 2,
                        "status": 1
                    }, 
                    {
                        "first_id": 3,
                        "second_id": 4,
                        "status": -1
                    }, 
                    {
                        "first_id": 4,
                        "second_id": 1,
                        "status": 1
                    }, 
                    {
                        "first_id": 4,
                        "second_id": 2,
                        "status": 0
                    }, 
                    {
                        "first_id": 4,
                        "second_id": 3,
                        "status": -1
                    }
                ]
            };
            $(json.words).each(function (index, word) {
                var w = new model.WordData(word.id, word.name);
                _this.wordList.push(w);
                _this.wordHash[w.id] = w;
            });
            this.connections = json.connections;
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
    function App(stageID) {
        this.controller = new control.StageController("myCanvas", stageID);
    }
    return App;
})();
