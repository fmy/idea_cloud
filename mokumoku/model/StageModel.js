/// <reference path="word.ts" />
var model;
(function (model) {
    var StageModel = (function () {
        function StageModel() { }
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
        };
        return StageModel;
    })();
    model.StageModel = StageModel;    
})(model || (model = {}));
//@ sourceMappingURL=StageModel.js.map
