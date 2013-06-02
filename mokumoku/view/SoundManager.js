var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view;
(function (view) {
    var SoundManager = (function (_super) {
        __extends(SoundManager, _super);
        function SoundManager() {
            _super.apply(this, arguments);

        }
        SoundManager.getInstance = function getInstance() {
            if(SoundManager.instance == null) {
                SoundManager.instance = new SoundManager();
            }
            return SoundManager.instance;
        };
        SoundManager.prototype.load = function () {
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
            queue.addEventListener("complete", function (e) {
                _this.dispatchEvent(new events.Event(events.Event.COMPLETE), _this);
            });
        };
        SoundManager.prototype.getSE = function (id) {
            return createjs.Sound.createInstance(id);
        };
        SoundManager.prototype.playSE = function (id) {
            createjs.Sound.play(id);
        };
        return SoundManager;
    })(createjs.EventDispatcher);
    view.SoundManager = SoundManager;    
})(view || (view = {}));
//@ sourceMappingURL=SoundManager.js.map
