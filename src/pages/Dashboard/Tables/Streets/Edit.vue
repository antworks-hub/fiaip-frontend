<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA VIA"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <streets-form
            :value="street"
            :api-errors="apiErrors"
            :is-loading="isLoading"
            @submit="handleSubmit"
            @delete="handleDelete"
            @input="updateValue($event)"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import StreetsForm from './Form.vue'

export default {
  components: { StreetsForm },

  data () {
    return {
      userId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      street: 'streets/single',
    })
  },

  created () {
    this.streetId = this.$route.params.id
    this.getStreet(this.streetId)
  },

  beforeDestroy () {
    this.clearStreet()
  },

  methods: {
    ...mapActions({
      getStreet: 'streets/get',
      updateStreet: 'streets/update',
      deleteStreet: 'streets/delete',
      clearStreet: 'streets/resetSingle',
      updateValue: 'streets/updateValue',
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateStreet({ id: this.streetId, payload: this.street }).then((res) => {
        this.$notify({
          message:
            'Via aggiornata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.isLoading = false
        this.$router.push('/tabelle/vie')
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteStreet(this.streetId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Via eliminata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/vie')
      })
    }
  }
}
</script>
<style></style>
