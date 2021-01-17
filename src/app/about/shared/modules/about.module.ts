import axios, { AxiosResponse } from 'axios';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import iUser from '../models/iUser';

@Module({ namespaced: true })
export default class AboutModule extends VuexModule {
  private users!: iUser[];

  get getUsers() {
    return this.users;
  }

  @Action
  public async fetchAllUsers() {
    await axios.get('http://localhost/ng-crud-app-back-end-php/public/api/users/first-name/ascending')
    .then((response: AxiosResponse<iUser>) => this.context.commit('setUsers', response.data))
    .catch((error) => console.log(error));
  }

  @Mutation
  public setUsers(users: iUser[]) {
    this.users = users;
  }
}