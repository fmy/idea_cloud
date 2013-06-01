/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="word.ts" />
declare var $:any;
module model {
    export class StageModel extends createjs.EventDispatcher {
        private wordList: WordData[];

        constructor(public stage_id: number) {
            super();
            this.wordList = [];
        }
        
        getWordList(): WordData[] {
            return this.wordList;
        }

        getWord(wordID: number): WordData {
            return null;
        }

        isConnect(wordA: WordData, wordB: WordData): bool {
            return true;
        }

        isDisConect(wordA: WordData, wordB: WordData): bool {
            return true;
        }
        wordConnect(wordA: WordData, wordB: WordData): bool {
            return true;
        }
        loadResource():void {
//            $.ajax({
//                url: "http://0.0.0.0:3000/stages/" + this.stage_id,
//                type: "get",
//                dataType: "json"
//            }).done((data) => {
//                JSON.parse(data).words.each((word) => {
//                    var w = new WordData(word.id, word.name);
//                    this.wordList.push(w);
//                });
//            });
            var data = '{"id": 1,"name": "level1","words": [{"id": 1,"name": "ごはん"},{"id": 2,"name": "たらこ"},{"id": 3,"name": "パスタ"},{"id": 4,"name": "みそ汁"}]}';
            JSON.parse(data).words.each((word) => {
                var w = new WordData(word.id, word.name);
                this.wordList.push(w);
            });

            this.loadedResource();
        }
        private loadedResource():void{
            this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
        }
    }
}