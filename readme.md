# Hive Stencil SCORM Viewer
Web component that allows you to render SCORM (e-learning) courses in your web (and Ionic native) applications. Injects custom event hooks and binding to support **offline** tracking of courses without a 3rd party library.

The SCORM course __must__ be served on the same origin (host:port) as the consuming application to avoid cross-frame injection.

## Installation
- `npm install @teammaestro/stencil-scorm-viewer`

## Usage
- `<hive-scorm-viewer src="http://www.mydomain/index.html"></hive-scorm-viewer>`

### Angular (6+) / Ionic (4+)
In your `angular.json` file add the following assets matcher in your `projects.app.architect.build.options.assets` collection:
```
{
    "glob": "**/*",
    "input": "node_modules/@teammaestro/stencil-scorm-viewer/dist/scormviewer",
    "output": "./scormviewer"
}
```

In your main `AppModule` (i.e. `app.module.ts`) add the following import statement:

```
import '@teammaestro/stencil-scorm-viewer/dist/scormviewer';
```

### Events
|Event|Description|
:---:|:---:
|`onSetValue`|Emitted when the course captures form data. Locally tracks data to `courseData` object.|
|`onCommit`|Emitted when a value is committed to the API.|
|`onInitiailize`|Emitted when the course initializes against the LMS.|
|`onFinish`|Emitted when the course finishes.|
|`onTerminate`|Emitted when the course is terminated.|

---

## Development

### Local Development

- `npm i`
- `npm run start`

_Note_: You will need to drop SCORM assets into `www/` to test in the browser.

### Building the Stencil Component

- `npm run build`
- `npm publish` or `npm pack` for local deployments

### Testing
- `npm run test`

## Contributors

[<img alt="Sean Perkins" src="https://avatars1.githubusercontent.com/u/13732623?v=4&s=117" width="117">](https://github.com/sean-perkins) |
:---:
|[Sean Perkins](https://github.com/sean-perkins)|
