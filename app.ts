module mokumoku {
    export class App {
        constructor() {

        }
        show():void {
            alert("test3333");
        }
    }

    export class CustomApp extends App{
        constructor() {
            super();
            this.show();
        }
    }
}