import { TestWindow } from '@stencil/core/dist/testing';
import { SCORMViewer } from './scorm-viewer';

describe('scorm-viewer', () => {
    it('should build', () => {
        expect(new SCORMViewer()).toBeTruthy();
    });

    describe('rendering', () => {
        let element: HTMLHiveScormViewerElement;
        let testWindow: TestWindow;
        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [SCORMViewer],
                html: '<hive-scorm-viewer></hive-scorm-viewer>'
            });
        });

    });
});
