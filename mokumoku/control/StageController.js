var control;
(function (control) {
    var StageController = (function () {
        function StageController() {
            this.model = new model.StageModel();
            this.view = new view.StageView(this.model);
        }
        return StageController;
    })();
    control.StageController = StageController;    
})(control || (control = {}));
//@ sourceMappingURL=StageController.js.map
