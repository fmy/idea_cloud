/// <reference path="../events/Event.ts" />
/// <reference path="../lib/CreateJS.d.ts" />
module view {
    export class ResourceManager extends createjs.EventDispatcher {
        static private instance: ResourceManager;
        static getInstance(): ResourceManager {
            if (ResourceManager.instance == null) {
                ResourceManager.instance = new ResourceManager();
            }
            return ResourceManager.instance;
        }
        private resource: any;

        constructor() {
            super();
            this.resource = {};
        }

        load(): void {
            var queue: createjs.LoadQueue = new createjs.LoadQueue(false);
            var manifest = [
                //{ id: "imgCon", src: "effect/con.png" },
                //{ id: "imgBara", src: "effect/bara.png" },
                { id:"kumo", src: "effect/kumo.png"},
                { id: "no01", src: "se/nocon1.mp3" },
                { id: "no02", src: "se/nocon2.mp3" },
                { id: "no03", src: "se/nocon3.mp3" },
                { id: "success01", src: "se/con1.mp3" },
                { id: "success02", src: "se/con2.mp3" },
                { id: "success03", src: "se/con3.mp3" },
                 { id: "fault01", src: "se/bara1.mp3" },
                { id: "fault02", src: "se/bara2.mp3" },
                { id: "fault03", src: "se/bara3.mp3" }
            ];

            queue.installPlugin(createjs.Sound);
            queue.loadManifest(manifest, true);
            queue.addEventListener("fileload", (e: any) => {
                var evt = e.item;
                switch (evt.type) {
                    case "image":
                        this.resource[evt.id] = new createjs.Bitmap(evt.src);
                        break;
                }
            });
            queue.addEventListener("complete", (e) => {
                this.dispatchEvent(new events.Event(events.Event.COMPLETE), this);
            });
        }

        getSE(id: string): createjs.SoundInstance {
            return createjs.Sound.createInstance(id);
        }

        playSE(id: string): void {
            createjs.Sound.play(id);
        }

        getBmp(id: string): createjs.Bitmap {
            return this.resource[id];
        }

        getKumo(): createjs.Bitmap {
            return this.resource["kumo"].clone();
        }

    }
}