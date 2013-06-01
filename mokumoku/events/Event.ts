module events {
    export class Event {
        static COMPLETE: string = "complete";
        constructor(public type: string = null, public value: any = null) {

        }
    }
}