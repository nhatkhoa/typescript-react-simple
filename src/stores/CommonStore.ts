import {observable, computed, action} from 'mobx'

export default class CommonStore {
  @observable views: [String]

  @computed get getLength(): number {
    return this.views.length
  }

  @action addView = (text: string): void => {
    if (!text) return
    this.views.push(text)
  }
}
