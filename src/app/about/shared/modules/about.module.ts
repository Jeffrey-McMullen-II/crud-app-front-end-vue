import axios, { AxiosResponse } from 'axios';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import iUser from '../models/iUser';

@Module({ namespaced: true })
export default class AboutModule extends VuexModule {
  private users: iUser[] | null = null;

  get getUsers() {
    return this.users;
  }

  @Action async fetchAllUsers() {
    await axios.get('http://192.168.0.22/api/public/users/first-name/ascending')
    .then((response: AxiosResponse<iUser>) => this.context.commit('setUsers', response.data))
    .catch((error) => console.log(error));
  }

  @Mutation setUsers(users: iUser[]) {
    this.users = users;
  }
}