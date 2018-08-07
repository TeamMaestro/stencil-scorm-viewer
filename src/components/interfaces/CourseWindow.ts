import { API } from './API';

export interface CourseWindow extends Window {
    // The underlying API layer for SCORM
    API: API;
    // The fallback API layer for SCORM 2004
    API_1484_11?: API;
}
