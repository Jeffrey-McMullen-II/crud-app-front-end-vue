import { Vue } from 'vue-class-component';
import { namespace } from 'vuex-class';

import User from './shared/models/User';

const AboutModule = namespace('AboutModule');
export default class About extends Vue {

  @AboutModule.Getter('getUsers') getUsers!: User[];
  @AboutModule.Action('fetchAllUsers') fetchAllUsers!: () => void;

  get users(): User[] {
    return this.getUsers;
  }

  mounted() {
    this.fetchAllUsers();
  }
}