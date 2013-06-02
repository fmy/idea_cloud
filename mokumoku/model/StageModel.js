var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            //            $.ajax({
            //                url: "http://0.0.0.0:3000/stages/" + this.stage_id,
            //                type: "get",
            //                dataType: "json"
            //            }).done((data) => {
            //                JSON.parse(data).words.each((word) => {
            //                    var w = new WordData(word.id, word.name);
            //                    this.wordList.push(w);
            //                });
            //            });
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
//@ sourceMappingURL=StageModel.js.map
