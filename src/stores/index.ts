

import CommonStore from './CommonStore'

export interface IStores {
  commonStores: CommonStore
}

/**
 * Creates the MobX stores.
 */

export default function createMobxStores(): IStores {
  return {
    commonStores: new CommonStore()
  }
}
