import { Options, Vue } from 'vue-class-component';

import HelloWorld from './hello-world/hello-world.component.vue';

@Options({
  components: { HelloWorld }
})
export default class Home extends Vue {
  message = "Hello World";
}