/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="word.ts" />
module model {
    export class StageModel extends createjs.EventDispatcher {
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

        }
    }
}