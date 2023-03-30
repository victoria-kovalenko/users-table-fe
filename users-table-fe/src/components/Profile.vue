<script>
import { getUserById, updateUser } from '../api/users';
import Loader from './Loader.vue';

export default {
    components: {
        Loader
    },
    props: {
        userId:String
    },
    data() {
        return {
            user: [],
            currentUserId: '',
            isLoading: true,
            minDate: '',
            title: '',
            description: '',
            start: '',
            end: '',
        }
    },
    mounted() {
        getUserById(this.userId)
            .then(({ data }) => {
                this.user = data;
                this.isLoading = false;
                this.minDate = this.nextAvailableDate(this.user[0].next);
            })
    },
    emits:['reset', 'close'],
    methods: {
        resetUser() {
            this.user = [];
            this.$emit('reset', this.currentUserId);
            this.$emit('close', false);
        },
        nextAvailableDate(lastEvenet) {
            const dateString = lastEvenet;
            const date = new Date(dateString);
            date.setDate(date.getDate() + 1);
            console.log(date.toISOString().slice(0, 10))
            return date.toISOString().slice(0, 10);
        },
        handleSubmit() {
            updateUser(this.title, this.description, this.start, this.end, this.userId)
                .then(({ data }) => {
                    this.isLoading = true;
                    this.resetUser();
                })
        },
    }
}
</script>

<template>
    <div v-if="userId" class="modal" id="modal" tabindex="-1" v-for="info of user">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ info.name }}</h5>
            <button 
                type="button" 
                class="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"
                @click="resetUser"
            >
            </button>
          </div>
          <div class="modal-body">
            <p>Email: {{ info.email }}</p>
            <p>Phone: {{ info.phone }}</p>
            <form >
                <fieldset>
                    <legend>Create Event</legend>
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control" v-model="title">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" v-model="description">
                    <label class="form-label" >Start Date</label>
                    <input type="date" class="form-control" v-bind:min="minDate" v-model="start">
                    <label class="form-label">End Date</label>
                    <input type="date" class="form-control" v-bind:min="minDate" v-model="end">
                </fieldset>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="handleSubmit">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <Loader v-if="isLoading"/>
</template>