<script >
import UsersTable from './components/UsersTable.vue';
import Form from './components/Form.vue';
import Header from './components/Header.vue';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      isOpenForm: false,
      user:{}
    }
  },
  components: {
    UsersTable,
    Form,
    Header
  },
}
</script>

<template>
  <header>
   <Header/>
  </header>

  <main class="main-container">
    <UsersTable v-if="!isOpenForm" @open="isOpenForm=$event" > :newUser="user" </UsersTable>
    <Form v-if="isOpenForm" @update="user=$event" @open="isOpenForm=$event"/>
  </main>
</template>

<style>

</style>
