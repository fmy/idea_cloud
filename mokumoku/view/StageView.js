var view;
(function (view) {
    var StageView = (function () {
        function StageView(model) {
            this.model = model;
        }
        StageView.prototype.loadResource = function () {
            this.loadedResource();
        };
        StageView.prototype.loadedResource = function () {
        };
        return StageView;
    })();
    view.StageView = StageView;    
})(view || (view = {}));
//@ sourceMappingURL=StageView.js.map
