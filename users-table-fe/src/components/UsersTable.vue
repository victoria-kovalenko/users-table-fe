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
    Profile,
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
      limit: 4,
      sortField: 'id',
      sortOrder: 'asc'
    }        
  },
  computed: {
    sortedClass: function () {
      return this.sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
    }
  },
 async mounted() {
    await getUsers()
      .then(({data}) => {
        this.users = data;
        this.displayedUsers = this.users.slice(0, this.limit);
        this.isLoading = false;
      })
  },
  emits: ['open'],
  async updated() {
    if (typeof this.newUser!== 'undefined' && Object.keys(this.newUser).length !== 0) {
      await this.users.push(this.newUser);
    }
  },
  watch: {
    async isLoading() {
      await getUsers()
        .then(({ data }) => {
          this.users = data;
          this.displayedUsers = this.users.slice(0, this.limit);
          this.isLoading = false;
        })
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
    },
     loadMore() {
      this.limit += 4;
      this.displayedUsers = this.users.slice(0, this.limit);
    },
    sortTable(column) {
      if (this.sortField === column) {
        this.sortOrder *= -1;
      } else {
        this.sortField = column;
        this.sortOrder = 1;
      }
      this.displayedUsers.sort(this.sortByField(column));
    },
    sortByField(field) {
      const sortOrder = this.sortOrder;
      const sortedData = this.users.sort((a, b) => {
        +a[field] - +b[field]
      });
      this.displayedUsers = sortedData;
    },
    sortIcon(column) {
      if (this.sortField === column) {
        return ['fas', this.sortOrder > 0 ? 'sort-up' : 'sort-down'];
      } else {
        return ['fas', 'sort'];
      }
    },
  }
}
</script>

<template>
  <Loader v-if="isLoading"/>
  <div class="user-container" >
    <button 
          type="submit" 
          class="btn btn-secondary btn-lg btn-position"
          v-if="!isOpenForm && !isLoading"
          @click="openForm"
        >
          Add User
      </button>

    <div class="table-container" v-if="!isLoading">
      <table class="table table-hover table-bordered table-bg ">
        <thead>
          <tr>
            <th 
              scope="col" 
              v-for="column of columnsName" 
              :key="column" 
              @click="sortTable(column)"
              class="choosen-user" 
            >
              {{ column }}
            </th>
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
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 100px;
}
  .btn-position {
    position: absolute;
    left: 10%;
  }
  .table-container {
    width: 800px;
  }

  .table-bg {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }

  .choosen-user {
    cursor: pointer;
  }
</style>