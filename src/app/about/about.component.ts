import { Vue } from 'vue-class-component';
import { namespace } from 'vuex-class';
import axios from 'axios';

import User from './shared/models/User';

const AboutModule = namespace('AboutModule');
export default class About extends Vue {

  @AboutModule.Getter('getUsers') getUsers!: User[];
  @AboutModule.Action('fetchAllUsers') fetchAllUsers!: () => void;

  selectedFile!: File;

  get users(): User[] {
    return this.getUsers;
  }

  mounted() {
    this.fetchAllUsers();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
    
  onUploadCLicked() {
    if (!this.selectedFile) { return; }

    const formData = new FormData();
    formData.append('name', this.selectedFile.name);
    formData.append('type', this.selectedFile.type);
    formData.append('file', this.selectedFile);

    axios.post(
      'http://localhost/ng-crud-app-backend-php/public/api/files',
      formData,
      { headers: {'Content-Type': 'multipart/form-data'}}
    );
  }
}