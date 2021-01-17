import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    redirectUrl: String
  }
})
export default class Welcome extends Vue {
  redirectUrl!: string;

  created() {
    if (this.redirectUrl) {
      this.$router.replace(this.redirectUrl);
    }
  }
}