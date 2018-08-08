import { TestWindow } from '@stencil/core/dist/testing';
import { SCORMViewer } from './scorm-viewer';
import { API } from '../interfaces';

describe('scorm-viewer', () => {

    it('should build', () => {
        expect(new SCORMViewer()).toBeTruthy();
    });

    let element: HTMLHiveScormViewerElement;
    let testWindow: TestWindow;
    // let component: SCORMViewer;

    beforeEach(async () => {
        // component = new SCORMViewer();
        testWindow = new TestWindow();
        element = await testWindow.load({
            components: [SCORMViewer],
            html: '<hive-scorm-viewer></hive-scorm-viewer>'
        });
    });

    describe('rendering', () => {

        it('should render an iframe', () => {
            expect(element.querySelectorAll('iframe').length).toBe(1);
        });

        it('should pass the src to the iframe', async () => {
            element.src = 'http://www.google.com/';
            await testWindow.flush();
            expect(element.querySelector('iframe').src).toEqual(element.src);
        });

    });

    describe('SCORM', () => {

        it('should attach an API object to the topmost window', () => {
            expect((window as any).API).toBeDefined();
        });

        let API: API;
        let comp: SCORMViewer;

        beforeEach(() => {
            comp = new SCORMViewer();
            API = (window as any).API;
        });

        it('should emit lmsInitialize event when LMSInitialize is called', () => {
            const changedSpy = jest.fn();
            comp.lmsInitialize = {
                emit: changedSpy
            };
            comp.LMSInitialize();
            expect(changedSpy).toHaveBeenCalled();
        });

        it('should emit lmsCommit event when LMSCommit is called', () => {
            const changedSpy = jest.fn();
            comp.lmsCommit = {
                emit: changedSpy
            };
            comp.LMSCommit();
            expect(changedSpy).toHaveBeenCalled();
        });

        it('should emit lmsFinish event when LMSFinish is called', () => {
            const changedSpy = jest.fn();
            comp.lmsFinish = {
                emit: changedSpy
            };
            comp.LMSFinish();
            expect(changedSpy).toHaveBeenCalled();
        });

        it('should emit lmsSetValue event when LMSSetValue is called', () => {
            const changedSpy = jest.fn();
            comp.lmsSetValue = {
                emit: changedSpy
            };
            comp.LMSSetValue('prop', true);
            expect(changedSpy).toHaveBeenCalled();
            expect(comp.courseData).toBeDefined();
            expect(comp.courseData['prop']).toEqual(true);
        });

    })
});
