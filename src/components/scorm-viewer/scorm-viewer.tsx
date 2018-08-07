import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { CourseWindow } from '../interfaces';

@Component({
    tag: 'hive-scorm-viewer',
    styleUrl: 'scorm-viewer.css',
    shadow: true
})
export class SCORMViewer {

    courseData = {};

    @Element() private element: HTMLElement;

    @Event() LMSSetValue: EventEmitter;
    @Event() LMSCommit: EventEmitter;
    @Event() LMSInitialize: EventEmitter;
    @Event() LMSFinish: EventEmitter;

    private scormWindow: CourseWindow;

    @Prop({ mutable: true }) src: string;

    componentDidLoad() {
        const frame = this.element.shadowRoot.querySelector('iframe');
        // Need to attach the API events prior to the frame loading
        this._attachEvents(frame);
    }

    private _attachEvents(frame: HTMLIFrameElement) {
        this.scormWindow = frame.contentWindow || frame as any;
        // If the window already has an API binding - skip
        if (this.scormWindow.API) {
            return;
        }
        this.scormWindow.API = {
            LMSInitialize: () => {
                this.LMSInitialize.emit();
                return "true";
            },
            LMSCommit: () => {
                this.LMSCommit.emit();
                return "true";
            },
            LMSFinish: () => {
                this.LMSFinish.emit();
                return "true";
            },
            LMSGetValue: (model) => {
                // TODO allow binding a function to return the value from the consuming app
                return this.courseData[model] as string || '';
            },
            LMSSetValue: (model, value) => {
                this.courseData[model] = value;
                this.LMSSetValue.emit({
                    model,
                    value
                });
                return "true";
            },
            LMSGetLastError: function () {
                return "0";
            },
            LMSGetErrorString: (errorCode: string) => {
                return errorCode || "No error";
            },
            LMSGetDiagnostic: (errorCode: string) => {
                return errorCode || "No error";
            }
        };
    }

    render() {
        return (
            <iframe src={this.src}></iframe>
        );
    }
}
