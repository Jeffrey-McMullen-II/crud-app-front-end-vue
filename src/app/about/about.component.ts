import axios, { AxiosResponse } from 'axios';
import { Vue } from 'vue-class-component';
import { namespace } from 'vuex-class';
import { PageState } from 'primevue/paginator';

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

  first: number | null = 0;
  rows: number | null = 1;
  totalRecords: number | null = null;

  isLoading = true;

  get users(): iUser[] {
    return this.getUsers;
  }

  mounted() {
    this.fetchAllUsers();

    const paginationRequest: iPaginationRequest = {
      first: this.first,
      rows: this.rows
    }

    this.getImages(paginationRequest);
  }

  onPaged(event: PageState) {
    const paginationRequest: iPaginationRequest = {
      first: event.first,
      rows: this.rows
    }

    this.isLoading = true;
    this.getImages(paginationRequest);
  }

  onFileSelected(fileList: FileList) {
    if (!fileList.length) { return; }

    this.uploadFile = fileList[0];

    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => this.uploadFileContents = fileReader.result, false);
    fileReader.readAsDataURL(this.uploadFile);
  }

  getImages(paginationRequest: iPaginationRequest) {
    axios.post('http://localhost/ng-crud-app-back-end-php/public/api/files/page-request', paginationRequest)
    .then((response: AxiosResponse<iPaginationResponse>) => {
      this.files = response.data.results;
      this.totalRecords = response.data.totalRecords;
      this.isLoading = false;
    })
    .catch((error) => console.log(error));
  }

  onImageClicked(fileProxy: iFile) {
    const file: iFile = Object.assign({}, fileProxy);
    const fileWindow = window.open(file.fileContents?.toString(), '_blank', '', false);
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