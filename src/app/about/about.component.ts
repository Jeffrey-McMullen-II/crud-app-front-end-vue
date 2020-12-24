import axios, { AxiosResponse } from 'axios';
import { Vue } from 'vue-class-component';
import { namespace } from 'vuex-class';

import IUser from './shared/models/IUser';
import IFile from './shared/models/IFile';

const AboutModule = namespace('AboutModule');

export default class About extends Vue {

  @AboutModule.Getter('getUsers') getUsers!: IUser[];
  @AboutModule.Action('fetchAllUsers') fetchAllUsers!: () => void;

  uploadFile: File | null = null;
  uploadFileContents: string | ArrayBuffer | null = null;

  returnedFileContents: string | ArrayBuffer | null = null;

  get users(): IUser[] {
    return this.getUsers;
  }

  mounted() {
    this.fetchAllUsers();

    axios.get('http://localhost/ng-crud-app-back-end-php/public/api/files/1')
    .then((response: AxiosResponse<IFile>) => { this.returnedFileContents = response.data.fileContents; })
    .catch((error) => { console.log(error); });
  }

  // eslint-disable-next-line
  onFileSelected(fileList: FileList) {
    if (!fileList.length) { return; }

    this.uploadFile = fileList[0];

    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => { this.uploadFileContents = fileReader.result; }, false);
    fileReader.readAsDataURL(this.uploadFile);
  }

  onUploadCLicked() {
    if (!this.uploadFile) { return; }

    const file: IFile = {
      fileId: null,
      fileName: this.uploadFile.name,
      fileType: this.uploadFile.type,
      fileContents: this.uploadFileContents
    }

    axios.post('http://localhost/ng-crud-app-back-end-php/public/api/files', file);
  }
}