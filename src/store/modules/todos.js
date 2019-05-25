import axios from 'axios'

const state = {
  todos: []
}

// 获取state的数据
const getters = {
  Todolist: state => state.todos
}

// 更新state的数据
const mutations = {
  setTodos(state, todos){
    state.todos = todos
  },
  postTodo(state, todo){
    state.todos.unshift(todo)
  },
  delTodo(state, id){
    state.todos = state.todos.filter(todo => todo.id != id)
  }
}

// 更新state数据的动作
const actions = {
  async getTodos({ commit }){
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
    commit('setTodos', res.data)
  },
  async addTodo({ commit }, todo) {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', todo)
    commit('postTodo', res.data)
  },
  async delteTodo({ commit }, id) {
    const res = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    commit('delTodo', id)
  },
  async filterTodos({ commit }, limit) {
    const res = await axios.get(
      `http://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", res.data);
  },
}


export default {state, getters, mutations, actions}

