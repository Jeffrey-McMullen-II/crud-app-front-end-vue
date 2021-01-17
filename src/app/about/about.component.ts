import axios, { AxiosResponse } from 'axios';
import { Vue } from 'vue-class-component';
import { namespace } from 'vuex-class';

import iUser from './shared/models/iUser';
import iFile from './shared/models/iFile';
import iPaginationRequest from '../core/shared/models/iPaginationRequest';
import iPaginationResponse from '../core/shared/models/iPaginationResponse';

const AboutModule = namespace('AboutModule');

export default class About extends Vue {

  @AboutModule.Getter('getUsers') getUsers!: iUser[];
  @AboutModule.Action('fetchAllUsers') fetchAllUsers!: () => void;

  uploadFile: File | null = null;
  uploadFileContents: string | ArrayBuffer | null = null;

  files: iFile[] | null = null;

  get users(): iUser[] {
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
    const paginationRequest: iPaginationRequest = {
      pageNumber: 1,
      resultsPerPage: 5
    }

    axios.post('http://localhost/ng-crud-app-back-end-php/public/api/files/by-pagination-request', paginationRequest)
    .then((response: AxiosResponse<iPaginationResponse>) => this.files = response.data.results)
    .catch((error) => console.log(error));
  }

  onUploadClicked() {
    if (!this.uploadFile) { return; }

    const file: iFile = {
      fileId: null,
      fileName: this.uploadFile.name,
      fileType: this.uploadFile.type,
      fileContents: this.uploadFileContents
    }

    axios.post('http://localhost/ng-crud-app-back-end-php/public/api/files', file);
  }
}