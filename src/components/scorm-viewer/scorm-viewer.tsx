import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { CourseWindow } from '../interfaces';

@Component({
    tag: 'hive-scorm-viewer',
    styleUrl: 'scorm-viewer.css',
    shadow: true
})
export class SCORMViewer {

    courseData = {};

    @Event() lmsSetValue: EventEmitter<{model: any, value: any}>;
    @Event() lmsCommit: EventEmitter<any>;
    @Event() lmsInitialize: EventEmitter<any>;
    @Event() lmsFinish: EventEmitter<any>;

    // Generic error event for if anything fails when attaching to the window object
    @Event() error: EventEmitter<any>;

    scormWindow: CourseWindow;

    @Prop({ mutable: true }) src: string;

    constructor() {
        this.LMSInitialize = this.LMSInitialize.bind(this);
        this.LMSCommit = this.LMSCommit.bind(this);
        this.LMSFinish = this.LMSFinish.bind(this);
        this.LMSGetValue = this.LMSGetValue.bind(this);
        this.LMSSetValue = this.LMSSetValue.bind(this);
        this.LMSGetLastError = this.LMSGetLastError.bind(this);
        this.LMSGetErrorString = this.LMSGetErrorString.bind(this);
        this.LMSGetDiagnostic = this.LMSGetDiagnostic.bind(this);
    }

    componentDidLoad() {
        this._attachEvents();

    }

    private _attachEvents() {
        this.scormWindow = this.topmostWindow as CourseWindow;
        // If the window already has an API binding - skip
        if (this.scormWindow.API) {
            return;
        }
        try {
            this.scormWindow.API = {
                LMSInitialize: this.LMSInitialize,
                LMSCommit: this.LMSCommit,
                LMSFinish: this.LMSFinish,
                LMSGetValue: this.LMSGetValue,
                LMSSetValue: this.LMSSetValue,
                LMSGetLastError: this.LMSGetLastError,
                LMSGetErrorString: this.LMSGetErrorString,
                LMSGetDiagnostic: this.LMSGetDiagnostic
            };
        } catch (error) {
            this.error.emit(error);
        }
    }

    LMSInitialize() {
        this.lmsInitialize.emit();
        return "true";
    }

    LMSCommit() {
        this.lmsCommit.emit();
        return "true";
    }

    LMSFinish() {
        this.lmsFinish.emit();
        return "true";
    }

    LMSGetValue(model) {
        // TODO allow binding a function to return the value from the consuming app
        return this.courseData[model] as string || '';
    }

    LMSSetValue(model, value) {
        this.courseData[model] = value;
        this.lmsSetValue.emit({
            model,
            value
        });
        return "true";
    }

    LMSGetLastError() {
        return "0";
    }

    LMSGetErrorString(errorCode: string) {
        return errorCode || "No Error";
    }

    LMSGetDiagnostic(errorCode: string) {
        return errorCode || "No Error";
    }

    /**
     * SCORM only cares about the topmost window frame for checking for important information.
     * Recursively climb the window tree to find the best window to attach to.
     */
    get topmostWindow(): Window {
        let tempWindow = window;
        while(tempWindow.parent !== null && tempWindow.parent !== tempWindow) {
            tempWindow = tempWindow.parent;
        }
        return tempWindow;
    }

    render() {
        return (
            <iframe src={this.src}></iframe>
        );
    }
}
