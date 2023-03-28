<script >
import UsersTable from './components/UsersTable.vue';
import Form from './components/Form.vue';
import Loader from './components/Loader.vue';

export default {
  data() {
    return {
      isOpenForm: false,
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
    <UsersTable v-if="!isOpenForm" @open="isOpenForm=$event"/>
    <Form v-if="isOpenForm"/>
  </main>
</template>

<style>

</style>
