export default interface iFile {
    fileId: number | null,
    fileName: string | null,
    fileType: string | null,
    fileContents: string | ArrayBuffer | null
}