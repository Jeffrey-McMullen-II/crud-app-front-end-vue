import { createStore } from 'vuex';
import AboutModule from '../src/app/about/shared/modules/about.module';

export default createStore({
  modules: {
    AboutModule
  }
});