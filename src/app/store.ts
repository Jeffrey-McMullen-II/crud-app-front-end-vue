import { createStore } from 'vuex';
import AboutModule from './about/shared/modules/about.module';

export default createStore({
  modules: {
    AboutModule
  }
});
