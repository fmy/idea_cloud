/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="word.ts" />
module model {
    export class StageModel extends createjs.EventDispatcher {
        wordList: WordData[];

        constructor() {
            super();
            this.wordList = [];
        }

        isConnect(wordA: WordData, wordB: WordData): bool {
            return true;
        }

        isDisConect(wordA: WordData, wordB: WordData): bool {
            return true;
        }
        loadResource():void{
            this.loadedResource();

        }
        private loadedResource():void{
            this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
        }
    }
}