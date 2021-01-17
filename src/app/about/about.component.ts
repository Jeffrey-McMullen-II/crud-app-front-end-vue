import axios, { AxiosResponse } from 'axios';
import { Vue } from 'vue-class-component';
import { namespace } from 'vuex-class';

import IUser from './shared/models/IUser';
import IFile from './shared/models/IFile';
import IPaginationRequest from '../core/shared/models/IPaginationRequest';
import IPaginationResponse from '../core/shared/models/IPaginationResponse';

const AboutModule = namespace('AboutModule');

export default class About extends Vue {

  @AboutModule.Getter('getUsers') getUsers!: IUser[];
  @AboutModule.Action('fetchAllUsers') fetchAllUsers!: () => void;

  uploadFile: File | null = null;
  uploadFileContents: string | ArrayBuffer | null = null;

  files: IFile[] | null = null;

  get users(): IUser[] {
    return this.getUsers;
  }

  mounted() {
    this.fetchAllUsers();

    this.getSmileys();
  }

  onFileSelected(fileList: FileList) {
    if (!fileList.length) { return; }

    this.uploadFile = fileList[0];

    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => this.uploadFileContents = fileReader.result, false);
    fileReader.readAsDataURL(this.uploadFile);
  }

  getSmileys() {
    const paginationRequest: IPaginationRequest = {
      pageNumber: 1,
      resultsPerPage: 5
    }

    axios.post('http://localhost/ng-crud-app-back-end-php/public/api/files/by-pagination-request', paginationRequest)
    .then((response: AxiosResponse<IPaginationResponse>) => this.files = response.data.results)
    .catch((error) => console.log(error));
  }

  onUploadClicked() {
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