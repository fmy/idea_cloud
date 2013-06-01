module events {
    export class Event {
        static COMPLETE: string = "complete";

        static CHANGE_PROPERTY:string ="changeProperty";
        constructor(public type: string = null, public value: any = null) {

        }
    }
}