import axios, { AxiosResponse } from 'axios';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import IUser from '../models/IUser';

@Module({ namespaced: true })
export default class AboutModule extends VuexModule {
  private users!: IUser[];

  get getUsers() {
    return this.users;
  }

  @Action
  public async fetchAllUsers() {
    await axios.get('http://localhost/ng-crud-app-backend-php/public/api/users/first-name/ascending')
    .then((response: AxiosResponse<IUser>) => { this.context.commit('setUsers', response.data); })
    .catch((error) => { console.log(error); });
  }

  @Mutation
  public setUsers(users: IUser[]) {
    this.users = users;
  }
}
