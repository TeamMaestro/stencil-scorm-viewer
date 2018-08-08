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

        let comp: SCORMViewer;

        beforeEach(() => {
            comp = new SCORMViewer();
        });

        it('should emit onInitialize event when initialize is called', () => {
            const changedSpy = jest.fn();
            comp.onInitialize = {
                emit: changedSpy
            };
            comp.initialize();
            expect(changedSpy).toHaveBeenCalled();
        });

        it('should emit onCommit event when commit is called', () => {
            const changedSpy = jest.fn();
            comp.onCommit = {
                emit: changedSpy
            };
            comp.commit();
            expect(changedSpy).toHaveBeenCalled();
        });

        it('should emit onFinish event when finish is called', () => {
            const changedSpy = jest.fn();
            comp.onFinish = {
                emit: changedSpy
            };
            comp.finish();
            expect(changedSpy).toHaveBeenCalled();
        });

        it('should emit onSetValue event when setValue is called', () => {
            const changedSpy = jest.fn();
            comp.onSetValue = {
                emit: changedSpy
            };
            comp.setValue('prop', true);
            expect(changedSpy).toHaveBeenCalled();
            expect(comp.courseData).toBeDefined();
            expect(comp.courseData['prop']).toEqual(true);
        });

        describe('2004 3rd Edition', () => {

            it('should have API_1484_11', async () => {
                comp.componentDidLoad();
                await testWindow.flush();
                expect(comp.scormWindow.API_1484_11).toBeDefined();
            });
        })

    })
});
