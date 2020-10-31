import axios from 'axios';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import User from '../models/User';

@Module({ namespaced: true })
export default class AboutModule extends VuexModule {
  private users!: User[];

  get getUsers() {
    return this.users;
  }

  @Action
  public async fetchAllUsers() {
    await axios.get('http://localhost/ng-crud-app-backend-php/public/api/users/first-name/ascending')
    .then(({ data }) => {
      this.context.commit('setUsers', data as User[]);
    })
    .catch(error=>{
      console.log(error);
    });
  }

  @Mutation
  public setUsers(users: User[]) {
    this.users = users;
  }
}