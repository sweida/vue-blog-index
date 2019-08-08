import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'
import user from './modules/user'
import blog from './modules/blog'
import createPersiste from 'vue-savedata'

Vue.use(Vuex)

const persiste = createPersiste({
  ciphertext: true, // 加密存本地, 默认为false
  LS: [
    {
      module: user,
      storePath: 'user' // __storePath:(和Vuex中的option.modules:{key：value}的key,一,一对应)__
    }
  ],
  SS: [
    {
      module: todos,
      storePath: 'todos'
    },
    {
      module: blog,
      storePath: 'blog'
    }
  ],
})

const store = new Vuex.Store({
  modules: {
    user,
    blog,
    todos,
  },
  //缓存所有store数据到本地 也可以单独缓存
  plugins: [persiste],
})

export default store;