/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface HiveScormViewer {
      'src': string;
    }
  }

  interface HTMLHiveScormViewerElement extends StencilComponents.HiveScormViewer, HTMLStencilElement {}

  var HTMLHiveScormViewerElement: {
    prototype: HTMLHiveScormViewerElement;
    new (): HTMLHiveScormViewerElement;
  };
  interface HTMLElementTagNameMap {
    'hive-scorm-viewer': HTMLHiveScormViewerElement;
  }
  interface ElementTagNameMap {
    'hive-scorm-viewer': HTMLHiveScormViewerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'hive-scorm-viewer': JSXElements.HiveScormViewerAttributes;
    }
  }
  namespace JSXElements {
    export interface HiveScormViewerAttributes extends HTMLAttributes {
      'onLMSCommit'?: (event: CustomEvent) => void;
      'onLMSFinish'?: (event: CustomEvent) => void;
      'onLMSInitialize'?: (event: CustomEvent) => void;
      'onLMSSetValue'?: (event: CustomEvent) => void;
      'src'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;