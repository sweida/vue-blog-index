<template>
  <div class="content">
    <AddTodo></AddTodo>
    <FilterTodo></FilterTodo>
    <li v-for="(item, index) in Todolist" :key="index">
      <span>{{item.id}}</span>
      <span>{{item.title}}</span>
      <i @click="delteTodo(item.id)">x</i>
    </li>
  </div>	
</template>


<script>
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
import FilterTodo from './FilterTodo'
import AddTodo from './AddTodo'

export default {
  components: {
    FilterTodo,
    AddTodo
  },
  data () {
    return {
      todos: this.$store.state.todos.todos
    }
  },
  computed: {
    ...mapGetters([
      'Todolist',
    ])
  },
  created(){
    this.getTodos()
    // this.$store.dispatch('getTodos')
  },
  methods:{
    ...mapActions([
      'getTodos',
      'addTodo',
      'delteTodo'
    ]),
  }
}
</script>

<style scoped>
.content{
  width: 500px;
  margin: auto;
}
span{
  margin-right: 10px
}

</style>
