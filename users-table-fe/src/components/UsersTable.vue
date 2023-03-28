<script>
import { getUsers } from '../api/users';
import Loader from './Loader.vue';
// import User from '../types/User'

export default {
  props: {
    newUser:{}
  },
  components: {
    Loader
  },
  data() {
    return {
      isLoading: true,
      columnsName: ['#','UserName', 'Email', 'PhoneNumber', 'Events Count', 'Next Event Date'],
      users: [],
      isOpenForm: false,
    }        
  },
 async mounted() {
    await getUsers()
      .then(({data}) => {
        this.users = data;
        console.log(data);
        this.isLoading = false;
      })
  },
  emits: ['open'],
  async updated() {
    if (newUser) {
      await this.users.push(this.newUser);
    }
  },
  methods: {
    openForm() {
      this.isOpenForm = true;
      this.$emit('open', this.isOpenForm)
    }
  }
}
</script>

<template>
  <Loader v-if="isLoading"/>
  <div class="user-container">
    <button 
          type="submit" 
          class="btn btn-secondary btn-lg"
          v-if="!isOpenForm && !isLoading"
          @click="openForm"
        >
          Add User
        </button>

    <div class="table-container" v-if="!isLoading">
      <table class="table table-hover table-bordered ">
        <thead>
          <tr>
            <th scope="col" v-for="column of columnsName">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user of users">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td v-if="user.count">{{ user.count }}</td>
            <td v-else="!user.count">0</td>
            <td v-if="user.next">{{ user.next }}</td>
            <td v-else="!user.next">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
  .user-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    width: 1000px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
  .table-container {
    width: 800px;
  }
</style>