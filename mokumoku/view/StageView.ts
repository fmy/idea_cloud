/// <reference path="../events/Event.ts" />
/// <reference path="../lib/CreateJS.d.ts" />
module view {
    
    export class StageView extends createjs.EventDispatcher {
        constructor(public model: model.StageModel) {
            super();
        }
        loadResource():void{
            this.loadedResource();

        }
        private loadedResource():void{
            this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
        }

    }
}