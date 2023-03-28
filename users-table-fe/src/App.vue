<script >
import UsersTable from './components/UsersTable.vue';
import Form from './components/Form.vue';
import Loader from './components/Loader.vue';

export default {
  data() {
    return {
      isOpenForm: false,
      user:{}
    }
  },
  components: {
    UsersTable,
    Form
  },
}
</script>

<template>
  <header>
   
  </header>

  <main>
    <UsersTable v-if="!isOpenForm" @open="isOpenForm=$event" > :newUser="user" </UsersTable>
    <Form v-if="isOpenForm" @update="user=$event" @open="isOpenForm=$event"/>
  </main>
</template>

<style>

</style>
