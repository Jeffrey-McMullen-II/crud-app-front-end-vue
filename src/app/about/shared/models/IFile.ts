export default interface IFile {
    fileId: number | null,
    fileName: string | null,
    fileType: string | null,
    fileContents: string | ArrayBuffer | null
}