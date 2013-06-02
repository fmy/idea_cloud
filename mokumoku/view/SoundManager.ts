/// <reference path="../events/Event.ts" />
/// <reference path="../lib/CreateJS.d.ts" />
module view {
    export class SoundManager extends createjs.EventDispatcher {
        static private instance: SoundManager;
        static getInstance(): SoundManager {
            if (SoundManager.instance == null) {
                SoundManager.instance = new SoundManager();
            }
            return SoundManager.instance;
        }

        load(): void {
            var queue: createjs.LoadQueue = new createjs.LoadQueue(false);
            var manifest = [
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

    }
}