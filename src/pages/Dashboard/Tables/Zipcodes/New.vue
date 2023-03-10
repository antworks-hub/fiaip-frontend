<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVO CAP"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <zipcode-form
            v-model="zipCode"
            :api-errors="apiErrors"
            :is-loading="isLoading"
            :streets="streets"
            @submit="handleSubmit"
            @clearErrors="apiErrors = {}"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ZipcodeForm from './Form.vue'

export default {
  components: { ZipcodeForm },

  data () {
    return {
      zipCode: {
        zip_code: '',
        numbers: '',
        street_id: '',
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      streets: 'streets/items'
    })
  },

  created(){
    this.fetchStreets()
  },

  beforeDestroy () {
    this.clearStreets()
  },

  methods: {
    ...mapActions({
      createZipcode: 'zipCodes/create',
      fetchStreets: 'streets/fetch',
      clearStreets: 'streets/resetSingle'
    }),
    handleSubmit () {
      this.isLoading = true
      this.createZipcode({ payload: this.zipCode }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Cap creato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/cap')
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
