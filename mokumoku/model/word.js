/**
* Created with JetBrains WebStorm.
* User: tsudakyouhei
* Date: 2013/06/01
* Time: 13:19
* To change this template use File | Settings | File Templates.
*/
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
//@ sourceMappingURL=word.js.map
