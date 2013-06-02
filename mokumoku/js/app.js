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
var view;
(function (view) {
    var ResourceManager = (function (_super) {
        __extends(ResourceManager, _super);
        function ResourceManager() {
                _super.call(this);
            this.resource = {
            };
        }
        ResourceManager.getInstance = function getInstance() {
            if(ResourceManager.instance == null) {
                ResourceManager.instance = new ResourceManager();
            }
            return ResourceManager.instance;
        };
        ResourceManager.prototype.load = function () {
            var _this = this;
            var queue = new createjs.LoadQueue(false);
            var manifest = [
                {
                    id: "no01",
                    src: "se/nocon1.mp3"
                }, 
                {
                    id: "no02",
                    src: "se/nocon2.mp3"
                }, 
                {
                    id: "no03",
                    src: "se/nocon3.mp3"
                }, 
                {
                    id: "success01",
                    src: "se/con1.mp3"
                }, 
                {
                    id: "success02",
                    src: "se/con2.mp3"
                }, 
                {
                    id: "success03",
                    src: "se/con3.mp3"
                }, 
                {
                    id: "fault01",
                    src: "se/bara1.mp3"
                }, 
                {
                    id: "fault02",
                    src: "se/bara2.mp3"
                }, 
                {
                    id: "fault03",
                    src: "se/bara3.mp3"
                }
            ];
            queue.installPlugin(createjs.Sound);
            queue.loadManifest(manifest, true);
            queue.addEventListener("fileload", function (e) {
                var evt = e.item;
                switch(evt.type) {
                    case "image":
                        _this.resource[evt.id] = new createjs.Bitmap(evt.src);
                        break;
                }
            });
            queue.addEventListener("complete", function (e) {
                _this.dispatchEvent(new events.Event(events.Event.COMPLETE), _this);
            });
        };
        ResourceManager.prototype.getSE = function (id) {
            return createjs.Sound.createInstance(id);
        };
        ResourceManager.prototype.playSE = function (id) {
            createjs.Sound.play(id);
        };
        ResourceManager.prototype.getBmp = function (id) {
            return this.resource[id];
        };
        return ResourceManager;
    })(createjs.EventDispatcher);
    view.ResourceManager = ResourceManager;    
})(view || (view = {}));
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
            this.connecting = [];
        }
        StageModel.prototype.getWordList = function () {
            return this.wordList;
        };
        StageModel.prototype.getWord = function (wordID) {
            return this.wordHash[wordID];
        };
        StageModel.prototype.getScore = function () {
            var score = 0;
            for(var i in this.connecting) {
                var size = this.connecting[i].length;
                score += Math.pow(3, size - 2) * 100;
            }
            return score;
        };
        StageModel.prototype.connect = function (id1, id2) {
            var exist = false;
            for(var i in this.connecting) {
                var set = this.connecting[i];
                for(var j in set) {
                    if(id1 == set[j]) {
                        exist = true;
                        this.connecting[i].push(id2);
                        break;
                    } else if(id2 == set[j]) {
                        exist = true;
                        this.connecting[i].push(id1);
                        break;
                    }
                }
            }
            if(!exist) {
                this.connecting.push([
                    id1, 
                    id2
                ]);
            }
            console.log(this.getScore());
        };
        StageModel.prototype.disConnect = function (id1, id2) {
            for(var i in this.connecting) {
                var set = this.connecting[i];
                for(var j in set) {
                    if(id1 == set[j] || id2 == set[j]) {
                        delete this.connecting[i];
                        break;
                    }
                }
            }
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
                        "name": "イスラム"
                    }, 
                    {
                        "id": 2,
                        "name": "断食"
                    }, 
                    {
                        "id": 3,
                        "name": "恐竜"
                    }, 
                    {
                        "id": 4,
                        "name": "肉食"
                    }, 
                    {
                        "id": 5,
                        "name": "ごはん"
                    }, 
                    {
                        "id": 6,
                        "name": "たらこ"
                    }, 
                    {
                        "id": 7,
                        "name": "パスタ"
                    }, 
                    {
                        "id": 8,
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
                        "status": 0
                    }, 
                    {
                        "first_id": 1,
                        "second_id": 4,
                        "status": -1
                    }, 
                    {
                        "first_id": 2,
                        "second_id": 1,
                        "status": 1
                    }, 
                    {
                        "first_id": 2,
                        "second_id": 3,
                        "status": -1
                    }, 
                    {
                        "first_id": 2,
                        "second_id": 4,
                        "status": -1
                    }, 
                    {
                        "first_id": 3,
                        "second_id": 1,
                        "status": 0
                    }, 
                    {
                        "first_id": 3,
                        "second_id": 2,
                        "status": -1
                    }, 
                    {
                        "first_id": 3,
                        "second_id": 4,
                        "status": 1
                    }, 
                    {
                        "first_id": 4,
                        "second_id": 1,
                        "status": -1
                    }, 
                    {
                        "first_id": 4,
                        "second_id": 2,
                        "status": -1
                    }, 
                    {
                        "first_id": 4,
                        "second_id": 3,
                        "status": 1
                    }, 
                    {
                        "first_id": 5,
                        "second_id": 6,
                        "status": 1
                    }, 
                    {
                        "first_id": 5,
                        "second_id": 7,
                        "status": -1
                    }, 
                    {
                        "first_id": 5,
                        "second_id": 8,
                        "status": 1
                    }, 
                    {
                        "first_id": 6,
                        "second_id": 5,
                        "status": 1
                    }, 
                    {
                        "first_id": 6,
                        "second_id": 7,
                        "status": 1
                    }, 
                    {
                        "first_id": 6,
                        "second_id": 8,
                        "status": 0
                    }, 
                    {
                        "first_id": 7,
                        "second_id": 5,
                        "status": -1
                    }, 
                    {
                        "first_id": 7,
                        "second_id": 6,
                        "status": 1
                    }, 
                    {
                        "first_id": 7,
                        "second_id": 8,
                        "status": 0
                    }, 
                    {
                        "first_id": 8,
                        "second_id": 5,
                        "status": 1
                    }, 
                    {
                        "first_id": 8,
                        "second_id": 6,
                        "status": 0
                    }, 
                    {
                        "first_id": 8,
                        "second_id": 7,
                        "status": 0
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
            var _this = this;
                _super.call(this);
            this.canvasID = canvasID;
            this.stageID = stageID;
            StageController.instance = this;
            createjs.Ticker.setFPS(30);
            this.model = new model.StageModel(this.stageID);
            this.view = new view.StageView(this.model, this.canvasID);
            this.view.addEventListener("draged", function (e) {
                _this.wordConnect(e.dragObject, e.dragTarget);
            });
            this.preLoad();
        }
        StageController.getInstance = function getInstance() {
            return StageController.instance;
        };
        StageController.prototype.wordConnect = function (wordA, wordB) {
            if(this.model.isConnect(wordA, wordB)) {
                this.view.connectWord(wordA, wordB);
            } else if(this.model.isDisConnect(wordA, wordB)) {
                this.view.disConnectWord(wordA, wordB);
            } else {
                this.view.noConnectWord(wordA);
            }
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
var EditApp = (function () {
    function EditApp() {
        this.controller = new control.StageController("myCanvas", 1);
    }
    return EditApp;
})();
