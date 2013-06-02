/// <reference path="../lib/CreateJS.d.ts" />
module view {
    export class IntaractionConainer extends createjs.Container {
        width: number = 0;
        height:number = 0;
        startDrag(e:createjs.MouseEvent): void {
            e.addEventListener("mousemove", this.move);
            e.addEventListener("mouseup", this.stopDrag);
        }

        move(e: createjs.MouseEvent): void {
            var instance:IntaractionConainer = <IntaractionConainer>e.target;
            instance.x = e.stageX - instance.width / 2;
            instance.y = e.stageY - instance.height / 2;
            instance.update();
        }

        stopDrag(e:createjs.MouseEvent): void {
            e.removeEventListener("mouseup", this.stopDrag);
            e.removeEventListener("mousemove", this.move);
            (<IntaractionConainer>e.target).dragEnd(<IntaractionConainer>e.target);
        }

        update(): void {

        }

        dragEnd(targert:IntaractionConainer): void {

        }
    }
}