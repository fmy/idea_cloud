module mokumoku {
    export class App {
        constructor() {

        }
        show():void {
            alert("tes");
        }
    }

    export class CustomApp extends App{
        constructor() {
            super();
            this.show();
        }
    }
}