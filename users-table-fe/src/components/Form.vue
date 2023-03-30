<script>
import { createUser } from '../api/users';

export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      phone: '',
      data: {},
      isOpen: true
    }
  },
  emits:['update', 'open'],
  methods: {
    handleSubmit() {
      createUser(this.name, this.surname, this.email, this.phone)
        .then(({ data }) => {
          this.data = data;
          this.isOpen = false;
          this.$emit('open', this.isOpen);
          this.$emit('update', this.data);
        })
    },
    close() {
      this.isOpen = false;
      this.$emit('open', this.isOpen);
    }
  }
}
</script>

<template>
    <form class="row g-3 form" id="form" @submit.prevent="handleSubmit">
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">First Name</label>
        <input type="text" class="form-control" v-model="name" required>
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Last name</label>
        <input type="text" class="form-control" v-model="surname" required>
      </div>
      <div class="col-12">
        <label for="inputAddress" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4" v-model="email" required>
      </div>
      <div class="col-12">
        <label for="inputAddress2" class="form-label">Phone</label>
        <input type="tel" class="form-control" v-model="phone" required>
      </div>
      <div class="col-12 display">
        <button type="button" class="btn btn-primary" data-bs-dismiss="form" aria-label="Close" @click="close">Close</button>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </div>
    </form>
</template>

<style>
.form{
  width:600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}

.display {
  display: flex;
  justify-content: space-between;
}
</style>