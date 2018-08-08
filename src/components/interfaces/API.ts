export interface API {

    LMSInitialize(): string;
    LMSCommit(): string;
    LMSFinish(): string;
    LMSGetValue(element: string): string;
    LMSSetValue(element: string, value: any): string;
    LMSGetLastError(): string;
    LMSGetErrorString(errorCode: string): string;
    LMSGetDiagnostic(errorCode: string): string;
    LMSTerminiate(): string;

    Initiailize(value: string): string;
    Commit(): string;
    Finish(): string;
    GetValue(element: string): string;
    SetValue(element: string, value: any): string;
    GetErrorString(errorCode: string): string;
    GetDiagnostic(errorCode: string): string;
    GetLastError(): string;
    Terminate(errorCode: string): string;

}
