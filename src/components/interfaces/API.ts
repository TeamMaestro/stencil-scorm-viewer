export interface API {

    LMSInitialize(): string;
    LMSCommit(): string;
    LMSFinish(): string;
    LMSGetValue(model: string, value: any): string;
    LMSSetValue(model: string, value: any): string;
    LMSGetLastError(): string;
    LMSGetErrorString(errorCode: string): string;
    LMSGetDiagnostic(errorCode: string): string;

}
