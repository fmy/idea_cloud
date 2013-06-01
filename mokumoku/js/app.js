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
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view;
(function (view) {
    var StageView = (function (_super) {
        __extends(StageView, _super);
        function StageView(model) {
                _super.call(this);
            this.model = model;
        }
        StageView.prototype.loadResource = function () {
            this.loadedResource();
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
    var WordData = (function () {
        function WordData(name, id) {
            this.id = id;
        }
        return WordData;
    })();
    model.WordData = WordData;    
})(model || (model = {}));
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
var control;
(function (control) {
    var StageController = (function (_super) {
        __extends(StageController, _super);
        function StageController() {
                _super.call(this);
            this.preLoad();
        }
        StageController.prototype.preLoad = function () {
            var _this = this;
            this.model = new model.StageModel();
            this.model.addEventListener(events.Event.COMPLETE, function (e) {
                _this.view.loadResource();
            });
            this.view = new view.StageView(this.model);
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
        this.controller = new control.StageController();
    }
    return App;
})();
window.onload = function () {
    new App();
};
