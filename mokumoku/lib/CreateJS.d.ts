interface NativeMouseEvent extends MouseEvent {

}

module createjs {
    // :: base classes :: //

    export class DisplayObject {
        // properties
        alpha: number;
        cacheCanvas: HTMLCanvasElement;
        cacheID: number;
        compositeOperation: string;
        cursor: string;
        filters: Filter[];
        hitArea: DisplayObject;
        id: number;
        mask: Shape;
        mouseEnabled: bool;
        name: string;
        parent: DisplayObject;
        regX: number;
        regY: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        shadow: Shadow;
        skewX: number;
        skewY: number;
        snapToPixel: bool;
        static suppressCrossDomainErrors: bool;
        visible: bool;
        x: number;
        y: number;

        // methods
        cache(x: number, y: number, width: number, height: number, scale?: number): void;
        clone(): DisplayObject;
        draw(ctx: CanvasRenderingContext2D, ignoreCache?: bool): void;
        getCacheDataURL(): string;
        getChildByName(name: string): DisplayObject;
        getConcatenatedMatrix(mtx: Matrix2D): Matrix2D;
        getMatrix(matrix: Matrix2D): Matrix2D;
        getStage(): Stage;
        globalToLocal(x: number, y: number): Point;
        hitTest(x: number, y: number): bool;
        isVisible(): bool;
        localToGlobal(x: number, y: number): Point;
        localToLocal(x: number, y: number, target: DisplayObject): Point;
        set (props: Object): DisplayObject;
        setTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): DisplayObject;
        setupContext(ctx: CanvasRenderingContext2D): void;
        toString(): string;
        uncache(): void;
        updateCache(compositeOperation: string): void;

        // events
        click: (event: MouseEvent) => any;
        dblClick: (event: MouseEvent) => any;
        mouseout: (event: MouseEvent) => any;
        mouseover: (event: MouseEvent) => any;
        mousedown: (event: MouseEvent) => any;
        tick: () => any;

        // EventDispatcher mixins
        addEventListener(type: string, listener: (eventObj: Object) => bool): Function;
        addEventListener(type: string, listener: (eventObj: Object) => void ): Function;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => bool; }): Object;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }): Object;
        removeEventListener(type: string, listener: (eventObj: Object) => bool): void;
        removeEventListener(type: string, listener: (eventObj: Object) => void ): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => bool; }): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }): void;
        removeAllEventListeners(type: string): void;
        dispatchEvent(eventObj: string, target: Object): bool;
        dispatchEvent(eventObj: Object, target: Object): bool;
        hasEventListener(type: string): bool;
    }


    export class Filter {
        constructor();
        applyFilter(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, targetCtx?: CanvasRenderingContext2D, targetX?: number, targetY?: number): bool;
        clone(): Filter;
        getBounds(): Rectangle;
        toString(): string;
    }


    // :: The rest :: //

    export class AlphaMapFilter extends Filter {
        // properties
        alphaMap: any;    //Image or HTMLCanvasElement

        // methods
        constructor(alphaMap: HTMLImageElement);
        constructor(alphaMap: HTMLCanvasElement);
        clone(): AlphaMapFilter;
    }


    export class AlphaMaskFilter extends Filter {
        // properties
        mask: any;    // HTMLImageElement or HTMLCanvasElement

        // methods
        constructor(mask: HTMLImageElement);
        constructor(mask: HTMLCanvasElement);
        clone(): AlphaMaskFilter;
    }


    export class Bitmap extends DisplayObject {
        // properties
        image: any;  // HTMLImageElement or HTMLCanvasElement or HTMLVideoElement
        snapToPixel: bool;
        sourceRect: Rectangle;

        // methods
        constructor(imageOrUrl: HTMLImageElement);
        constructor(imageOrUrl: HTMLCanvasElement);
        constructor(imageOrUrl: HTMLVideoElement);
        constructor(imageOrUrl: string);

        clone(): Bitmap;
        updateCache(): void;
    }


    export class BitmapAnimation extends DisplayObject {
        // properties
        currentAnimation: string;
        currentAnimationFrame: number;
        currentFrame: number;
        offset: number;
        paused: bool;
        snapToPixel: bool;
        spriteSheet: SpriteSheet;

        // methods
        constructor(spriteSheet: SpriteSheet);
        advance(): void;
        cache(): void;
        clone(): BitmapAnimation;
        getBounds(): Rectangle;
        gotoAndPlay(frameOrAnimation: string): void;
        gotoAndPlay(frameOrAnimation: number): void;
        play(): void;
        stop(): void;
        updateCache(): void;

        // events
        onAnimationEnd: (event: Object) => any;
    }

    export class ButtonHelper {
        // properties
        target: Object;
        overLabel: string;
        outLabel: string;
        downLabel: string;
        play: bool;

        // methods
        constructor(target: MovieClip, outLabel: string, overLabel: string, downLabel: string, play: bool, hitArea: DisplayObject, hitLabel: string);
        constructor(target: BitmapAnimation, outLabel: string, overLabel: string, downLabel: string, play: bool, hitArea: DisplayObject, hitLabel: string);
        setEnabled(value: bool);
        toString(): string;
    }

    export class BoxBlurFilter extends Filter {
        // properties
        blurX: number;
        blurY: number;
        quality: number;

        // methods
        constructor(blurX: number, blurY: number, quality: number);
        clone(): BoxBlurFilter;
    }


    export class ColorFilter extends Filter {
        // properties
        alphaOffset: number;
        blueMultiplier: number;
        blueOffset: number;
        greenMultiplier: number;
        greenOffset: number;
        redMultiplier: number;
        redOffset: number;

        // methods
        constructor(redMultiplier?: number, greenMultiplier?: number, blueMultiplier?: number, alphaMultiplier?: number, redOffset?: number, greenOffset?: number, blueOffset?: number, alphaOffset?: number);
        clone(): ColorFilter;
    }


    export class ColorMatrix {
        // properties
        DELTA_INDEX: number[];
        IDENTITY_MATRIX: number[];
        LENGTH: number;

        // methods
        constructor(brightness: number, contrast: number, saturation: number, hue: number);
        adjustBrightness(value: number): ColorMatrix;
        adjustColor(brightness: number, contrast: number, saturation: number, hue: number): ColorMatrix;
        adjustContrast(value: number): ColorMatrix;
        adjustHue(value: number): ColorMatrix;
        adjustSaturation(value: number): ColorMatrix;
        clone(): ColorMatrix;
        concat(matrix: ColorMatrix[]): ColorMatrix;
        copyMatrix(matrix: ColorMatrix[]): ColorMatrix;
        reset(): ColorMatrix;
        toArray(): number[];
    }


    export class ColorMatrixFilter extends Filter {
        // methods
        constructor(matrix: number[]);
        clone(): ColorMatrixFilter;
    }


    export class Command {
        // methods
        constructor(f, params, path);
        exec(scope: any): void;
    }


    export class Container extends DisplayObject {
        // properties
        children: DisplayObject[];

        // methods
        addChild(...child: DisplayObject[]): DisplayObject;
        addChildAt(...childOrIndex: any[]): DisplayObject; // actually (...child: DisplayObject[], index: number)
        clone(recursive?: bool): Container;
        contains(child: DisplayObject): bool;
        getChildAt(index: number): DisplayObject;
        getChildIndex(child: DisplayObject): number;
        getNumChildren(): number;
        getObjectsUnderPoint(x, number, y: number): DisplayObject[];
        getObjectUnderPoint(x: number, y: number): DisplayObject;
        hitTest(x: number, y: number): bool;
        removeAllChildren(): void;
        removeChild(...child: DisplayObject[]): bool;
        removeChildAt(...index: number[]): bool;
        setChildIndex(child: DisplayObject, index: number): void;
        sortChildren(sortFunction: (a: DisplayObject, b: DisplayObject) => number): void;
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        swapChildrenAt(index1: number, index2: number): void;
    }


    export class DOMElement extends DisplayObject {
        // properties
        htmlElement: HTMLElement;

        // methods
        constructor(htmlElement: HTMLElement);
        clone(): DOMElement;
    }


    export class EaselJS {
        // properties
        version: string;
        buildDate: string;
    }


    export class EventDispatcher {
        // properties

        // methods
        static initialize(target: Object): void;

        addEventListener(type: string, listener: (eventObj: Object) => bool): Function;
        addEventListener(type: string, listener: (eventObj: Object) => void ): Function;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => bool; }): Object;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }): Object;
        removeEventListener(type: string, listener: (eventObj: Object) => bool): void;
        removeEventListener(type: string, listener: (eventObj: Object) => void ): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => bool; }): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }): void;
        removeAllEventListeners(type: string): void;
        dispatchEvent(eventObj: string, target: Object): bool;
        dispatchEvent(eventObj: Object, target: Object): bool;
        hasEventListener(type: string): bool;
        toString(): string;
    }


    export class Graphics {
        // properties
        BASE_64: Object;
        curveTo(cpx: number, cpy: number, x: number, y: number): Graphics;    // same as quadraticCurveTo()
        drawRect(x: number, y: number, width: number, height: number): Graphics;   // same as rect()
        STROKE_CAPS_MAP: string[];
        STROKE_JOINTS_MAP: string[];

        // methods
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: bool): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        beginBitmapFill(image: Object, repetition?: string, matrix?: Matrix2D): Graphics;
        beginBitmapStroke(image: Object, repetition?: string): Graphics;
        beginFill(color: string): Graphics;
        beginLinearGradientFill(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
        beginLinearGradientStroke(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
        beginRadialGradientFill(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
        beginRadialGradientStroke(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
        beginStroke(color: string): Graphics;
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): Graphics;
        clear(): Graphics;
        clone(): Graphics;
        closePath(): Graphics;
        decodePath(str: string): Graphics;
        draw(ctx: CanvasRenderingContext2D): void;
        drawAsPath(ctx: CanvasRenderingContext2D): void;
        drawCircle(x: number, y: number, radius: number): Graphics;
        drawEllipse(x: number, y: number, width: number, height: number): Graphics;
        drawPolyStar(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number): Graphics;
        drawRoundRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
        drawRoundRectComplex(x: number, y: number, width: number, height: number, radiusTL: number, radiusTR: number, radiusBR: number, radisBL: number): Graphics;
        endFill(): Graphics;
        endStroke(): Graphics;
        isEmpty(): bool;
        static getHSL(hue: number, saturation: number, lightness: number, alpha?: number): string;
        static getRGB(red: number, green: number, blue: number, alpha?: number): string;
        lineTo(x: number, y: number): Graphics;
        moveTo(x: number, y: number): Graphics;
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): Graphics;
        rect(x: number, y: number, width: number, height: number): Graphics;
        setStrokeStyle(thickness: number, caps?: string, joints?: string, miter?: number, ignoreScale?: bool): Graphics;  // caps and joints can be a string or number
        setStrokeStyle(thickness: number, caps?: number, joints?: string, miter?: number, ignoreScale?: bool): Graphics;
        setStrokeStyle(thickness: number, caps?: string, joints?: number, miter?: number, ignoreScale?: bool): Graphics;
        setStrokeStyle(thickness: number, caps?: number, joints?: number, miter?: number, ignoreScale?: bool): Graphics;
        toString(): string;
    }


    export class Log {
        // properties
        static NONE: number;
        static ERROR: number;
        static WARNING: number;
        static TRACE: number;
        static ALL: number;
        static level: number;

        // methods
        static out(message: string, details: string, level: number);
        static addKeys(keys: Object);
        static log(message: string, details: string, level: number);
    }

    export class Matrix2D {
        // properties
        a: number;
        alpha: number;
        atx: number;
        b: number;
        c: number;
        compositeOperation: string;
        d: number;
        static DEG_TO_RAD: number;
        static identity: Matrix2D;
        shadow: Shadow;
        ty: number;

        // methods
        constructor(a: number, b: number, c: number, d: number, tx: number, ty: number);
        append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D;
        appendMatrix(matrix: Matrix2D): Matrix2D;
        appendProperties(a: number, b: number, c: number, d: number, tx: number, ty: number, alpha: number, shadow: Shadow, compositeOperation: string): Matrix2D;
        appendTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX?: number, regY?: number): Matrix2D;
        clone(): Matrix2D;
        decompose(target: Object): Matrix2D;
        identity(): Matrix2D;
        invert(): Matrix2D;
        isIdentity(): bool;
        prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D;
        prependMatrix(matrix: Matrix2D): Matrix2D;
        prependProperties(alpha: number, shadow: Shadow, compositeOperation: string): Matrix2D;
        prependTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX?: number, regY?: number): Matrix2D;
        rotate(angle: number): Matrix2D;
        scale(x: number, y: number): Matrix2D;
        skew(skewX: number, skewY: number): Matrix2D;
        toString(): string;
        translate(x: number, y: number): Matrix2D;
    }


    export class MouseEvent {

        // properties
        nativeEvent: NativeMouseEvent;
        pointerID: number;
        primaryPointer: bool;
        rawX: number;
        rawY: number;
        stageX: number;
        stageY: number;
        target: DisplayObject;
        type: string;

        // methods
        constructor(type: string, stageX: number, stageY: number, target: DisplayObject, nativeEvent: NativeMouseEvent, pointerID: number, primary: bool, rawX: number, rawY: number);
        clone(): MouseEvent;
        toString(): string;

        // EventDispatcher mixins
        addEventListener(type: string, listener: (eventObj: Object) => bool): Function;
        addEventListener(type: string, listener: (eventObj: Object) => void ): Function;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => bool; }): Object;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }): Object;
        removeEventListener(type: string, listener: (eventObj: Object) => bool): void;
        removeEventListener(type: string, listener: (eventObj: Object) => void ): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => bool; }): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }): void;
        removeAllEventListeners(type: string): void;
        dispatchEvent(eventObj: string, target: Object): bool;
        dispatchEvent(eventObj: Object, target: Object): bool;
        hasEventListener(type: string): bool;

        // events
        onMouseMove: (event: MouseEvent) => any;
        onMouseUp: (event: MouseEvent) => any;
    }


    export class MovieClip extends Container {
        // properties
        actionsEnabled: bool;
        autoReset: bool;
        currentFrame: number;
        static INDEPENDENT: string;
        loop: bool;
        mode: string;
        paused: bool;
        static SINGLE_FRAME: string;
        startPosition: number;
        static SYNCHED: string;
        timeline: Timeline; //HERE requires tweenJS

        // methods
        constructor(mode: string, startPosition: number, loop: bool, labels: Object);
        clone(recursive?: bool): MovieClip;
        gotoAndPlay(positionOrLabel: string): void;
        gotoAndPlay(positionOrLabel: number): void;
        gotoAndStop(positionOrLabel: string): void;
        gotoAndStop(positionOrLabel: number): void;
        play(): void;
        stop(): void;
    }


    export class Point {
        // properties
        x: number;
        y: number;

        // methods
        constructor(x: number, y: number);
        clone(): Point;
        toString(): string;
    }


    export class Rectangle {
        // properties
        x: number;
        y: number;
        width: number;
        height: number;

        // methods
        constructor(x: number, y: number, width: number, height: number);
        clone(): Rectangle;
        toString(): string;
    }


    export class Shadow {
        // properties
        blur: number;
        color: string;
        static identity: Shadow;
        offsetX: number;
        offsetY: number;

        // methods
        constructor(color: string, offsetX: number, offsetY: number, blur: number);
        clone(): Shadow;
        toString(): string;
    }


    export class Shape extends DisplayObject {
        // properties
        graphics: Graphics;

        // methods
        constructor(graphics?: Graphics);
        clone(recursive?: bool): Shape;
    }


    // what is returned from .getAnimation()
    interface SpriteSheetAnimation {
        frames: number[];
        frequency: number;
        name: string;
        next: string;
    }

    export class SpriteSheet {
        // properties
        complete: bool;

        // methods
        constructor(data: Object);
        clone(): SpriteSheet;
        getAnimation(name: string): SpriteSheetAnimation;
        getAnimations(): string[];
        getFrame(frameIndex: number): Object;
        getFrameBounds(frameIndex: number);
        getNumFrames(animation: string): number;
        toString(): string;

        // events
        onComplete: () => any;
    }


    export class SpriteSheetBuilder {
        // properties
        defaultScale: number;
        maxWidth: number;
        maxHeight: number;
        padding: number;
        progress: number;
        spriteSheet: SpriteSheet;
        timeSlice: number;

        // methods
        addFrame(source: DisplayObject, sourceRect?: Rectangle, scale?: number, setupFunction?: () => any, setupParams?: any[], setupScope?: Object): any; //HERE returns number or null
        addMovieClip(source: MovieClip, sourceRect?: Rectangle, scale?: number): void;
        build(): void;
        buildAsync(timeSlice?: number): void;
        clone(): SpriteSheetBuilder;
        stopAsync(): void;
        toString(): string;

        // events
        complete: (event: Object) => any;
        onProgress: (event: Object) => any;
    }


    export class SpriteSheetUtils {
        static addFlippedFrames(spriteSheet: SpriteSheet, horizontal?: bool, vertical?: bool, both?: bool): void;
        static extractFrame(spriteSheet: SpriteSheet, frame: number): HTMLImageElement;
        static extractFrame(spriteSheet: SpriteSheet, animationName: string): HTMLImageElement;
        static flip(spriteSheet: HTMLImageElement, flipData: Object): void;
        static mergeAlpha(rgbImage: HTMLImageElement, alphaImage: HTMLImageElement, canvas?: HTMLCanvasElement): HTMLCanvasElement;
    }


    export class Stage extends Container {
        // properties
        autoClear: bool;
        canvas: HTMLCanvasElement;
        mouseInBounds: bool;
        mouseX: number;
        mouseY: number;
        snapToPixelEnabled: bool;
        tickOnUpdate: bool;

        new (): Stage;
        new (canvas: HTMLElement): Stage;

        // methods
        constructor(canvas: HTMLCanvasElement);
        clone(): Stage;
        enableMouseOver(frequency: number): void;
        enableDOMEvents(enable: bool): void;
        toDataURL(backgroundColor: string, mimeType: string): string;
        update(): void;
        clear(): void;
        handleEvent(evt: Object): void;

        // events
        stagemousemove: (event: MouseEvent) => any;
        stagemouseup: (event: MouseEvent) => any;
    }


    export class Text extends DisplayObject {
        // properties
        color: string;
        font: string;
        lineHeight: number;
        lineWidth: number;
        maxWidth: number;
        outline: bool;
        text: string;
        textAlign: string;
        textBaseline: string;

        // methods
        constructor(text?: string, font?: string, color?: string);
        clone(): Text;
        getMeasuredHeight(): number;
        getMeasuredLineHeight(): number;
        getMeasuredWidth(): number;
    }


    export class Ticker {
        // properties
        static useRAF: bool;

        // methods
        static addListener(o: Object, pauseable?: bool): void;
        static getFPS(): number;
        static getInterval(): number;
        static getMeasuredFPS(ticks?: number): number;
        static getPaused(): bool;
        static getTicks(pauseable?: bool): number;
        static getTime(pauseable: bool): number;
        static init(): void;
        static removeAllListeners(): void;
        static removeListener(o: Object): void;
        static setFPS(value: number): void;
        static setInterval(interval: number): void;
        static setPaused(value: bool): void;

        // EventDispatcher mixins
        static addEventListener(type: string, listener: (eventObj: Object) => bool): Function;
        static addEventListener(type: string, listener: (eventObj: Object) => void ): Function;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => bool; }): Object;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }): Object;
        static removeEventListener(type: string, listener: (eventObj: Object) => bool): void;
        static removeEventListener(type: string, listener: (eventObj: Object) => void ): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => bool; }): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }): void;

        // events
        tick: (timeElapsed: number) => any;
    }


    export class Touch {
        // methods
        static disable(stage: Stage): void;
        static enable(stage: Stage, singleTouch?: bool, allowDefault?: bool): bool;
        static isSupported(): bool;
    }


    export class UID {
        // methods
        static get (): number;
    }
}


// Type definitions for TweenJS 0.4
// Project: http://www.createjs.com/#!/TweenJS
// Definitions by: Pedro Ferreira <https://bitbucket.org/drk4>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/*
    Copyright (c) 2012 Pedro Ferreira
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

module createjs {

    export class TweenJS {
        // properties
        version: string;
        buildDate: string;
    }


    export class CSSPlugin {
        // properties
        static cssSuffixMap: Object;

        // methods
        static install(): void;
    }


    export class Ease {
        // methods
        static backIn(): number;
        static backInOut(): number;
        static backOut(): number;
        static bounceIn(amount: number): number;
        static bounceInOut(amount: number): number;
        static bounceOut(amount: number): number;
        static circIn(amount: number): number;
        static circInOut(amount: number): number;
        static circOut(amount: number): number;
        static cubicIn(): number;
        static cubicInOut(): number;
        static cubicOut(): number;
        static elasticIn(): number;
        static elasticInOut(): number;
        static elasticOut(): number;
        static get (amount: number): (amount: number) => number;
        static getBackIn(amount: number): (amount: number) => number;
        static getBackInOut(amount: number): (amount: number) => number;
        static getBackOut(amount: number): (amount: number) => number;
        static getElasticIn(amplitude: number, period: number): (amount: number) => number;
        static getElasticInOut(amplitude: number, period: number): (amount: number) => number;
        static getElasticOut(amplitude: number, period: number): (amount: number) => number;
        static getPowIn(pow: number): (amount: number) => number;
        static getPowInOut(pow: number): (amount: number) => number;
        static getPowOut(pow: number): (amount: number) => number;
        static linear(amount: number): number;
        static none(amount: number): number;    // same as linear
        static quadIn(): (amount: number) => number;
        static quadInOut(): (amount: number) => number;
        static quadOut(): (amount: number) => number;
        static quartIn(): (amount: number) => number;
        static quartInOut(): (amount: number) => number;
        static quartOut(): (amount: number) => number;
        static quintIn(): (amount: number) => number;
        static quintInOut(): (amount: number) => number;
        static quintOut(): (amount: number) => number;
        static sineIn(amount: number): number;
        static sineInOut(amount: number): number;
        static sineOut(amount: number): number;
    }


    export class Timeline {
        constructor(tweens: Tween[], labels: Object, props: Object);

        // properties
        duration: number;
        ignoreGlobalPause: bool;
        loop: bool;
        position: number;

        // methods
        addLabel(label: string, position: number): void;
        addTween(...tween: Tween[]): void;
        gotoAndPlay(positionOrLabel: string): void;
        gotoAndPlay(positionOrLabel: number): void;
        gotoAndStop(positionOrLabel: string): void;
        gotoAndStop(positionOrLabel: number): void;
        removeTween(...tween: Tween[]): void;
        resolve(positionOrLabel: string): number;
        resolve(positionOrLabel: number): number;
        setPaused(value: bool): void;
        setPosition(value: number, actionsMode?: number): void;
        tick(delta: number): void;
        toString(): string;
        updateDuration(): void;

        // events
        onChange: (instance: Timeline) => any;
    }


    export class Tween {
        constructor(target: Object, props: Object);

        // properties
        duration: number;
        static IGNORE: Object;
        ignoreGlobalPause: bool;
        loop: bool;
        static LOOP: number;
        static NONE: number;
        pluginData: Object;
        position: number;
        static REVERSE: number;
        target: Object;

        // methods
        call(callback: (tweenObject: Tween) => any, params?: any[], scope?: Object);    // when 'params' isn't given, the callback receives a tweenObject
        call(callback: (...params: any[]) => any, params?: any[], scope?: Object); // otherwise, it receives the params only
        static get (target, props?: Object, pluginData?: Object, override?: bool): Tween;
        static hasActiveTweens(target?): void;
        static installPlugin(plugin: Object, properties: Object): void;
        pause(tween: Tween): void;
        play(tween: Tween): void;
        static removeTweens(target): void;
        set (props: Object, target?): void;
        setPaused(value: bool): void;
        setPosition(value: number, actionsMode: number): void;
        static tick(delta: number, paused: bool): void;
        to(props: Object, duration?: number, ease?: (amount: number) => number): Tween;
        toString(): string;
        wait(duration: number): void;

        // events
        change: (event) => any;

        // EventDispatcher mixins
        addEventListener(type: string, listener: (eventObj: Object) => bool): Function;
        addEventListener(type: string, listener: (eventObj: Object) => bool): Object;
        removeEventListener(type: string, listener: (eventObj: Function) => bool): void;
        removeEventListener(type: string, listener: (eventObj: Object) => bool): void;
        removeAllEventListeners(type: string): void;
        dispatchEvent(eventObj: string, target: Object): bool;
        dispatchEvent(eventObj: Object, target: Object): bool;
        hasEventListener(type: string): bool;
    }


    export class MotionGuidePlugin {
        // properties
        static priority: number;

        //methods
        static install(): Object;
    }
}


// Type definitions for PreloadJS 0.3
// Project: http://www.createjs.com/#!/PreloadJS
// Definitions by: Pedro Ferreira <https://bitbucket.org/drk4>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/*
    Copyright (c) 2012 Pedro Ferreira
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

module createjs {
    export class AbstractLoader {
        // properties
        canceled: bool;
        loaded: bool;
        progress: number;

        // methods
        close(): void;
        getItem(value: string): Object;
        load(): void;
        toString(): string;

        // events
        complete: (event: Object) => any;
        error: (event: Object) => any;
        fileload: (event: Object) => any;
        fileprogress: (event: Object) => any;
        loadStart: (event: Object) => any;

        // EventDispatcher mixins
        addEventListener(type: string, listener: (eventObj: Object) => bool): Function;
        addEventListener(type: string, listener: (eventObj: Object) => bool): Object;
        removeEventListener(type: string, listener: (eventObj: Function) => bool): void;
        removeEventListener(type: string, listener: (eventObj: Object) => bool): void;
        removeAllEventListeners(type: string): void;
        dispatchEvent(eventObj: string, target: Object): bool;
        dispatchEvent(eventObj: Object, target: Object): bool;
        hasEventListener(type: string): bool;
    }

    export class PreloadJS {
        version: string;
        buildDate: string;
    }

    export class LoadQueue extends AbstractLoader {
        constructor(useXHR?: bool);

        // properties
        static BINARY: string;
        static CSS: string;
        static IMAGE: string;
        static JAVASCRIPT: string;
        static JSON: string;
        static SOUND: string;
        static SVG: string;
        static TEXT: string;
        static LOAD_TIMEOUT: number;
        static XML: string;

        maintainScriptOrder: bool;
        next: LoadQueue;
        stopOnError: bool;
        useXHR: bool;

        // methods
        BrowserDetect(): Object;
        init(useXHR?: bool): void;
        close(): void;
        initialize(useXHR: bool): void;
        installPlugin(plugin: any): void;
        load(): void;
        loadFile(file: Object, loadNow?: bool): void;
        loadFile(file: string, loadNow?: bool): void;
        loadManifest(manifest: Object[], loadNow?: bool): void;
        loadManifest(manifest: string[], loadNow?: bool): void;
        getItem(value: string): Object;
        getResult(value: string, rawResult?: bool): Object;
        removeAll(): void;
        remove(idsOrUrls: string): void;
        remove(idsOrUrls: Array): void;
        reset(): void;
        setMaxConnections(value: number): void;
        setUseXHR(value: bool): void;
        setPaused(value: bool): void;
    }


    export class TagLoader extends AbstractLoader {
        constructor(item: Object, srcAttr: string, useXHR: bool);
        constructor(item: string, srcAttr: string, useXHR: bool);
        getResult(): HTMLImageElement;
        getResult(): HTMLAudioElement;
    }


    export class XHRLoader extends AbstractLoader {
        constructor(file: Object);
        getResult(rawResult?: bool);
    }
}


// Type definitions for SoundJS 0.4
// Project: http://www.createjs.com/#!/SoundJS
// Definitions by: Pedro Ferreira <https://bitbucket.org/drk4>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/*
    Copyright (c) 2012 Pedro Ferreira
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

module createjs {
    export class FlashPlugin {
        // properties
        static BASE_PATH: string;
        static capabilities: Object;
        showOutput: bool;

        // methods
        create(src: string): SoundInstance;
        preload(src: string, instance: Object): void;
        static generateCapabilities(): void;
        static isSupported(): bool;
        isPreloadStarted(src: string): bool;
        register(src: string, instances: Number): Object;
        setVolume(value: Number): bool;
        getVolume(): Number;
        setMute(isMuted: bool): Boolean;
        toString(): string;

        // Flash API
        unregisterPreloadInstance(flashId: string): void;
        unregisterSoundInstance(flashId: string): void;
        flashLog(data: string): void;
        handleSoundEvent(flashId: string, method: string): void;
        handlePreloadEvent(flashId: string, method: string): void;
        handleEvent(method: string): void;
        handleErrorEvent(error: string): void;
    }

    export class HTMLAudioPlugin {
        // properties
        static capabilities: Object;
        static MAX_INSTANCES: number;
        static AUDIO_READY: string;
        static AUDIO_ENDED: string;
        static AUDIO_ERROR: string;
        static AUDIO_STALLED: string;
        capabilities: Object;
        defaultNumChannels: number;

        // methods
        create(src: string): SoundInstance;
        static generateCapabilities(): void;
        static isSupported(): bool;
        register(src: string, instances: number): Object;
        isPreloadStarted(src: string): bool;
        preload(src: string, instance: Object): void;
        toString(): string;
    }

    export class WebAudioPlugin {
        // properties
        static capabilities: Object;
        static MAX_INSTANCES: number;
        static AUDIO_READY: string;
        static AUDIO_ENDED: string;
        static AUDIO_ERROR: string;
        static AUDIO_STALLED: string;
        arrayBuffers: ArrayBuffer[];
        capabilities: Object;
        defaultNumChannels: number;
        dynamicsCompressorNode: Object;
        gainNode: Object;
        volume: number;
        context: any;
        WebAudioLoader(src: string, owner: Object): Function;

        // methods
        create(src: string): SoundInstance;
        static generateCapabilities(): void;
        static isSupported(): bool;
        setVolume(value: Number): bool;
        getVolume(): number;
        register(src: string, instances: number): Object;
        isPreloadStarted(src: string): bool;
        preload(src: string, instance: Object): void;
        isPreloadComplete(src: string): bool;
        removeFromPreload(src: string);
        setMute(value: number): bool;
        toString(): string;
    }

    export class SoundInstance {
        constructor(src: string, owner: string, flash: string);

        // properties
        muted: bool;
        owner: HTMLAudioPlugin;
        offset: number;
        paused: bool;
        delay: number;
        pan: number;
        duration: number;
        playState: string;
        delayTimeoutId: number;
        src: string;
        uniqueId: any;   //HERE string or number
        volume: number;

        // methods
        getDuration(): number;
        getPan(): number;
        getPosition(): number;
        getVolume(): number;
        mute(isMuted: bool): bool;
        pause(): bool;
        play(interrupt: string, delay: number, offset: number, loop: number, volume: number, pan: number): void;
        resume(): bool;
        setPan(value: number): number;
        setPosition(value: number): void;
        setVolume(value: number): bool;
        stop(): bool;

        // events
        complete: () => any;
        loop: () => any;
        failed: () => any;
        interrupted: () => any;
        succeeded: () => any;
        ready: () => any;

        // EventDispatcher mixins
        addEventListener(type: string, listener: (eventObj: Object) => bool): Function;
        addEventListener(type: string, listener: (eventObj: Object) => bool): Object;
        removeEventListener(type: string, listener: (eventObj: Function) => bool): void;
        removeEventListener(type: string, listener: (eventObj: Object) => bool): void;
        removeAllEventListeners(type: string): void;
        dispatchEvent(eventObj: string, target: Object): bool;
        dispatchEvent(eventObj: Object, target: Object): bool;
        hasEventListener(type: string): bool;
    }


    export class Sound {
        // properties
        static activePlugin: Object;
        static AUDIO_TIMEOUT: number;
        static DELIMITER: string;
        static INTERRUPT_ANY: string;
        static INTERRUPT_EARLY: string;
        static INTERRUPT_LATE: string;
        static INTERRUPT_NONE: string;
        static muted: bool;
        static PLAY_FAILED: string;
        static PLAY_FINISHED: string;
        static PLAY_INITED: string;
        static PLAY_INTERRUPTED: string;
        static PLAY_SUCCEEDED: string;
        static SUPPORTED_EXTENSIONS: Array;
        static EXTENSION_MAP: Object;
        static defaultInterruptBehavior: string;

        // methods
        static checkPlugin(initializeDefault: bool): bool;
        static createInstance(src: string): SoundInstance;
        static getCapabilities(): Object;
        static getCapability(key: string): any;    //HERE can return string | number | bool
        static getInstanceById(uniqueId: string): SoundInstance;
        static getMute(): number;
        static getMasterVolume(): number;
        static getSrcFromId(value: string): string;
        static getVolume(): number;
        static isReady(): bool;
        static pause(id: string): void;
        static play(src: string, interrupt?: string, delay?: number, offset?: number, loop?: number, volume?: number, pan?: number): SoundInstance;
        static registerPlugin(plugin: Object): bool;
        static registerPlugins(plugins: Object[]): bool;
        static registerSound(src: Object, id: string, data: Object, preload?: bool): Object;
        static registerManifest(manifest: Array);
        static resume(id: string): void;
        static setMasterVolume(value: number): bool;
        static setMute(isMuted: bool, id: string): bool;
        static setVolume(value: number, id?: string): bool;
        static stop(): bool;

        // events
        loadComplete: () => any;

        // EventDispatcher mixins
        addEventListener(type: string, listener: (eventObj: Object) => bool): Function;
        addEventListener(type: string, listener: (eventObj: Object) => bool): Object;
        removeEventListener(type: string, listener: (eventObj: Function) => bool): void;
        removeEventListener(type: string, listener: (eventObj: Object) => bool): void;
        removeAllEventListeners(type: string): void;
        dispatchEvent(eventObj: string, target: Object): bool;
        dispatchEvent(eventObj: Object, target: Object): bool;
        hasEventListener(type: string): bool;
    }

    export class BrowserDetect {
        // properties
        static isFirefox: bool;
        static isOpera: bool;
        static isChrome: bool;
        static isIOS: bool;
        static isAndroid: bool;
        static isBlackberry: bool;

        // methods
        static init();
    }
}
