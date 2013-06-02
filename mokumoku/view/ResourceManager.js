var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
//@ sourceMappingURL=ResourceManager.js.map
