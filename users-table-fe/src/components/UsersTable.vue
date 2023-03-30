<script>
import { getUsers } from '../api/users';
import Loader from './Loader.vue';
import Profile from './Profile.vue';

export default {
  props: {
    newUser:Object
  },
  components: {
    Loader,
    Profile
  },
  data() {
    return {
      isLoading: true,
      columnsName: ['#','UserName', 'Email', 'PhoneNumber', 'Events Count', 'Next Event Date'],
      users: [],
      isOpenForm: false,
      isSelectedUserId: false,
      selectedUserId: '',
      displayedUsers: [],
      limit:4,
    }        
  },
 async mounted() {
    await getUsers()
      .then(({data}) => {
        this.users = data;
        this.displayedUsers = this.users.slice(0, this.limit);
        console.log(this.displayedUsers)
        this.isLoading = false;
      })
  },
  emits: ['open'],
  async updated() {
    if (typeof this.newUser!== 'undefined' && Object.keys(this.newUser).length !== 0) {
      await this.users.push(this.newUser);
    }
  },
  methods: {
    openForm() {
      this.isOpenForm = true;
      this.$emit('open', this.isOpenForm)
    },
    selectUser(id) {
      this.selectedUserId = id;
      this.isSelectedUserId = true;
      console.log(this.selectedUserId)
    },
     loadMore() {
      this.limit += 4;
      this.displayedUsers = this.users.slice(0, this.limit);
    },
  }
}
</script>

<template>
  <Loader v-if="isLoading"/>
  <div class="user-container" >
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
          <tr v-for="user of displayedUsers">
            <th scope="row">{{ user.id }}</th>
            <td 
              class="choosen-user" 
              data-bs-toggle="modal" 
              data-bs-target="#modal"
              data-bs-remote="./Profile.vue"
              @click="selectUser(user._id)"
            >
             {{ user.name }}
            </td>
            <td>{{ user.email}}</td>
            <td>{{ user.phone }}</td>
            <td v-if="user.count">{{ user.count }}</td>
            <td v-else="!user.count">0</td>
            <td v-if="user.next">{{ user.next }}</td>
            <td v-else="!user.next">0</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button class="btn btn-secondary btn-lg" @click="loadMore">Load More</button>
      </div>
    </div>
  </div>

  <Profile 
    v-if="isSelectedUserId" 
    :userId="selectedUserId" 
    @reset="selectedUserId=$event" 
    @close="isSelectedUserId=$event"
  />
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

  .choosen-user {
    cursor: pointer;
  }
</style>