<script>
import { getUsers } from '../api/users';
import Loader from './Loader.vue';

export default {
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
          <td>{{ user.count }}</td>
          <td>{{ user.next }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
  .table-container {
    width: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
</style>