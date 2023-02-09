<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA AMMINISTRATORE"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <admin-form
          :value="admin"
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
import AdminForm from './Form.vue'

export default {
  components: { AdminForm },
  data () {
    return {
      adminId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      admin: 'admins/single'
    })
  },

  created () {
    this.adminId = this.$route.params.id
    this.getAdmin(this.adminId)
  },

  beforeDestroy () {
    this.clearAdmin()
  },

  methods: {
    ...mapActions({
      getAdmin: 'admins/get',
      updateAdmin: 'admins/update',
      deleteAdmin: 'admins/delete',
      reloadUser: 'auth/reload',
      clearAdmin: 'admins/resetSingle',
      updateValue: 'admins/updateValue'
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateAdmin({ id: this.adminId, payload: this.admin }).then((res) => {
        this.$notify({
          message:
            'Amministratore aggiornato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.reloadUser().then((res) => {
          this.isLoading = false
          this.$router.push('/amministratori')
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
      this.deleteAdmin(this.adminId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Amministratore eliminato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/amministratori')
      })
    }
  }
}
</script>
<style></style>
