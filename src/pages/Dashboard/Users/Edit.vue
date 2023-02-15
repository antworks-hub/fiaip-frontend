<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA UTENTE"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <user-form
          :value="user"
          :api-errors="apiErrors"
          :is-loading="isLoading"
          @submit="handleSubmit"
          @delete="handleDelete"
          @input="updateValue($event)"
          @clearErrors="apiErrors = {}"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import UserForm from './Form.vue'

export default {
  components: { UserForm },
  data () {
    return {
      userId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      user: 'users/single'
    })
  },

  created () {
    this.userId = this.$route.params.id
    this.getUser(this.userId)
  },

  beforeDestroy () {
    this.clearUser()
  },

  methods: {
    ...mapActions({
      getUser: 'users/get',
      updateUser: 'users/update',
      deleteUser: 'users/delete',
      reloadUser: 'auth/reload',
      clearUser: 'users/resetSingle',
      updateValue: 'users/updateValue'
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateUser({ id: this.userId, payload: this.user }).then((res) => {
        this.$notify({
          message:
            'Utente aggiornato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.reloadUser().then((res) => {
          this.isLoading = false
          this.$router.push('/utenti')
        })
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteUser(this.userId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Utente eliminato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/utenti')
      })
    }
  }
}
</script>
<style></style>
