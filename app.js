var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mokumoku;
(function (mokumoku) {
    var App = (function () {
        function App() {
        }
        App.prototype.show = function () {
            alert("test3333");
        };
        return App;
    })();
    mokumoku.App = App;    
    var CustomApp = (function (_super) {
        __extends(CustomApp, _super);
        function CustomApp() {
                _super.call(this);
            this.show();
        }
        return CustomApp;
    })(App);
    mokumoku.CustomApp = CustomApp;    
})(mokumoku || (mokumoku = {}));
//@ sourceMappingURL=app.js.map
