/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="word.ts" />
declare var $:any;
module model {
    export class StageModel extends createjs.EventDispatcher {
        private wordList: WordData[];
        private wordHash: any;
        private connections: any;

        constructor(public stage_id: number) {
            super();
            this.wordList = [];
            this.wordHash = {};
        }
        
        getWordList(): WordData[] {
            return this.wordList;
        }

        getWord(wordID: number): WordData {
            return this.wordHash[wordID];
        }

        isConnect(wordA: WordData, wordB: WordData): bool {
            var result: bool = false;
            for (var prop in this.connections) {
                var connection = this.connections[prop];
                if (connection.first_id == wordA.id && connection.second_id == wordB.id) {
                    if (connection.status == 1) {
                        result = true;
                    }
                    break;
                }
            }
            return result;
        }

        isDisConnect(wordA: WordData, wordB: WordData): bool {
            var result: bool = false;
            for (var prop in this.connections) {
                var connection = this.connections[prop];
                if (connection.first_id == wordA.id && connection.second_id == wordB.id) {
                    if (connection.status == -1) {
                        result = true;
                    }
                    break;
                }
            }
            return result;
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
            var json = {
                "id": 1,
                "name": "level1",
                "words": [
                    {"id": 1,"name": "ごはん"},
                    {"id": 2,"name": "たらこ"},
                    {"id": 3,"name": "パスタ"},
                    {"id": 4,"name": "みそ汁"}
                ],
                "connections": [
                    {"first_id": 1, "second_id": 2, "status": 1},
                    {"first_id": 1, "second_id": 3, "status": -1},
                    {"first_id": 1, "second_id": 4, "status": 1},
                    {"first_id": 2, "second_id": 1, "status": 1},
                    {"first_id": 2, "second_id": 3, "status": 1},
                    {"first_id": 2, "second_id": 4, "status": 0},
                    {"first_id": 3, "second_id": 1, "status": -1},
                    {"first_id": 3, "second_id": 2, "status": 1},
                    {"first_id": 3, "second_id": 4, "status": -1},
                    {"first_id": 4, "second_id": 1, "status": 1},
                    {"first_id": 4, "second_id": 2, "status": 0},
                    {"first_id": 4, "second_id": 3, "status": -1}
                ]
            }
            $(json.words).each((index, word) => {
                var w = new WordData(word.id, word.name);
                this.wordList.push(w);
                this.wordHash[w.id] = w;
            });
            this.connections = json.connections;
            this.loadedResource();
        }
        private loadedResource():void{
            this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
        }
    }
}