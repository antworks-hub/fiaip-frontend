<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVA VIA"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <streets-form
            v-model="street"
            :api-errors="apiErrors"
            :is-loading="isLoading"
            @submit="handleSubmit"
            @clearErrors="apiErrors = {}"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import StreetsForm from './Form.vue'

export default {
  components: { StreetsForm },

  data () {
    return {
      street: {
        street_name: '',
        street_type: '',
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  methods: {
    ...mapActions({
      createStreet: 'streets/create',
    }),
    handleSubmit () {
      this.isLoading = true
      this.createStreet({ payload: this.street }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Via creata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/vie')
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    }
  }
}
</script>
<style></style>
