/// <reference path="../lib/CreateJS.d.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="word.ts" />
declare var $:any;
module model {
    export class StageModel extends createjs.EventDispatcher {
        private wordList: WordData[];
        private wordHash: any;
        private connections: any;
        private connecting: number[][];

        constructor(public stageID: number) {
            super();
            this.wordList = [];
            this.wordHash = {};
            this.connecting = [];
        }
        
        getWordList(): WordData[] {
            return this.wordList;
        }

        getWord(wordID: number): WordData {
            return this.wordHash[wordID];
        }

        getScore(): number {
            var score = 0;
            for (var i in this.connecting) {
                var size = this.connecting[i].length;
                score += Math.pow(3, size - 2) * 100;
            }
            return score;
        }

        connect(id1:number, id2:number) {
            var exist = false;
            for (var i in this.connecting) {
                var set = this.connecting[i];
                for (var j in set) {
                    if (id1 == set[j]) {
                        exist = true;
                        this.connecting[i].push(id2);
                        break;
                    } else if (id2 == set[j]) {
                        exist = true;
                        this.connecting[i].push(id1);
                        break;
                    }
                }
            }
            if (!exist) {
                this.connecting.push([id1, id2]);
            }
            console.log(this.getScore());
        }

        disConnect(id1:number, id2:number) {
            for (var i in this.connecting) {
                var set = this.connecting[i];
                for (var j in set) {
                    if (id1 == set[j] || id2 == set[j]) {
                        delete this.connecting[i];
                        break;
                    }
                }
            }
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
//                url: "/stages/" + this.stageID,
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