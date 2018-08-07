# Hive Stencil SCORM Viewer
Web component that allows you to render SCORM (e-learning) courses in your web (and Ionic native) applications. Injects custom event hooks and binding to support **offline** tracking of courses without a 3rd party library.

The SCORM course __must__ be served on the same origin (host:port) as the consuming application to avoid cross-frame injection.

## Installation
- `npm install @teammaestro/stencil-scorm-viewer`

## Usage
- `<hive-scorm-viewer src="http://www.mydomain/index.html"></hive-scorm-viewer>`


### Events
|Event|Description|
:---:|:---:
|`lmsSetValue`|Emitted when the course captures form data. Locally tracks data to `courseData` object.|
|`lmsCommit`|Emitted when a value is committed.|
|`lmsInitialize`|Emitted when the course initializes against the LMS.|
|`lmsFinish`|Emitted when the course finishes.|

## Contributors

[<img alt="Sean Perkins" src="https://avatars1.githubusercontent.com/u/13732623?v=4&s=117" width="117">](https://github.com/sean-perkins) |
:---:
|[Sean Perkins](https://github.com/sean-perkins)|
