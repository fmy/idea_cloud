var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="word.ts" />
var model;
(function (model) {
    var StageModel = (function (_super) {
        __extends(StageModel, _super);
        function StageModel() {
                _super.call(this);
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
        StageModel.prototype.loadResource = function () {
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
