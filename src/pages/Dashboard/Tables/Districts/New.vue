<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVA CIRCOSCRIZIONE"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <district-form
            v-model="district"
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
import DistrictForm from './Form.vue'

export default {
  components: { DistrictForm },

  data () {
    return {
      district: {
        district_name: '',
        district_number: '',
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  methods: {
    ...mapActions({
      createDistrict: 'districts/create',
    }),
    handleSubmit () {
      this.isLoading = true
      this.createDistrict({ payload: this.district }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Circoscrizione creata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/circoscrizioni')
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
