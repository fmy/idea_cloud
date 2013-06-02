var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
//@ sourceMappingURL=StageModel.js.map
