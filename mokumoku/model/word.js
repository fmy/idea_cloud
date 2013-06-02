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
//@ sourceMappingURL=word.js.map
