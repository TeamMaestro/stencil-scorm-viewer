import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { CourseWindow } from '../interfaces';

@Component({
    tag: 'hive-scorm-viewer',
    styleUrl: 'scorm-viewer.css',
    shadow: true
})
export class SCORMViewer {

    courseData = {};

    @Event() onInitialize: EventEmitter<any>;
    @Event() onFinish: EventEmitter<any>;
    @Event() onTerminate: EventEmitter<any>;
    @Event() onCommit: EventEmitter<any>;
    @Event() onSetValue: EventEmitter<{ element: any, value: any }>;

    // Generic error event for if anything fails when attaching to the window object
    @Event() error: EventEmitter<any>;

    scormWindow: CourseWindow;

    @Prop({ mutable: true }) src: string;

    constructor() {
        this.initialize = this.initialize.bind(this);
        this.commit = this.commit.bind(this);
        this.finish = this.finish.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.getLastError = this.getLastError.bind(this);
        this.getErrorString = this.getErrorString.bind(this);
        this.getDiagnostic = this.getDiagnostic.bind(this);
        this.terminate = this.terminate.bind(this);
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
                Initiailize: this.initialize,
                LMSInitialize: this.initialize,
                Commit: this.commit,
                LMSCommit: this.commit,
                Finish: this.finish,
                LMSFinish: this.finish,
                GetValue: this.getValue,
                LMSGetValue: this.getValue,
                SetValue: this.setValue,
                LMSSetValue: this.setValue,
                GetLastError: this.getLastError,
                LMSGetLastError: this.getLastError,
                GetErrorString: this.getErrorString,
                LMSGetErrorString: this.getErrorString,
                GetDiagnostic: this.getDiagnostic,
                LMSGetDiagnostic: this.getDiagnostic,
                Terminate: this.terminate,
                LMSTerminiate: this.terminate
            };
            // Backwards compatability for SCORM 2004 3rd Edition
            this.scormWindow.API_1484_11 = this.scormWindow.API;
        } catch (error) {
            this.error.emit(error);
        }
    }

    /**
     * Event raised when the SCORM course attempts to establish a connection with the API.
     * Returns true if the connection was successfully established.
     */
    initialize() {
        this.onInitialize.emit();
        return "true";
    }

    /**
     * Invoked when the LMS attempts to record a value.
     */
    commit() {
        this.onCommit.emit();
        return "true";
    }

    /**
     * Invoked when the LMS course is finished.
     */
    finish() {
        this.onFinish.emit();
        return "true";
    }

    /**
     * Attemps to retrieve a value from the API for the currnt element
     * @param element The element key to find a value for.
     */
    getValue(element) {
        // TODO allow binding a function to return the value from the consuming app
        return this.courseData[element] as string || '';
    }

    /**
     * Attempts to set a value with the API.
     * @param element The element key to set the value for.
     * @param value The value to store.
     */
    setValue(element, value) {
        this.courseData[element] = value;
        this.onSetValue.emit({
            element,
            value
        });
        return "true";
    }

    /**
     * Returns the errorNumber for the underlying error description when something fails in the API.
     */
    getLastError() {
        return "0";
    }

    /**
     * Translates the errorNumber from the getLastError method into a readable error description.
     * @param errorCode The error code to parse into a description.
     */
    getErrorString(errorCode: string) {
        return errorCode || "No Error";
    }

    /**
     * Translates the errorNumber from the getLastError method into a readable diagnostic
     * @param errorCode The error code to parse into a description.
     */
    getDiagnostic(errorCode: string) {
        return errorCode || "No Error";
    }

    /**
     * Event raised when the SCORM course is exited.
     * Returns true if the API was successfully disconnected.
     */
    terminate() {
        return "true";
    }

    /**
     * SCORM only cares about the topmost window frame for checking for important information.
     * Recursively climb the window tree to find the best window to attach to.
     */
    get topmostWindow(): Window {
        let tempWindow = window;
        let attempts = 0;
        while(tempWindow.parent !== null && tempWindow.parent !== tempWindow) {
            attempts++;
            tempWindow = tempWindow.parent;
            if (attempts > 7) {
                break;
            }
        }
        return tempWindow;
    }

    render() {
        return (
            <iframe src={this.src}></iframe>
        );
    }
}
