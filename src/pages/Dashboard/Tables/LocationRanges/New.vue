<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVA FASCIA"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <location-ranges-form
            v-model="locationRange"
            :api-errors="apiErrors"
            :is-loading="isLoading"
            :areas="areas"
            :districts="districts"
            @submit="handleSubmit"
            @clearErrors="apiErrors = {}"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import LocationRangesForm from './Form.vue'

export default {
  components: { LocationRangesForm },

  data () {
    return {
      locationRange: {
        min_value: '',
        max_value: '',
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      areas: 'areas/items',
      districts: 'districts/items'
    })
  },

  created(){
    this.fetchAreas()
    this.fetchDistricts()
  },

  beforeDestroy () {
    this.clearAreas()
    this.clearDistricts()
  },

  methods: {
    ...mapActions({
      createLocationRange: 'locationRanges/create',
      fetchAreas: 'areas/fetch',
      clearAreas: 'areas/resetSingle',
      fetchDistricts: 'districts/fetch',
      clearDistricts: 'districts/resetSingle'
    }),
    handleSubmit () {
      this.isLoading = true
      this.createLocationRange({ payload: this.locationRange }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Fascia creata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/fasce')
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
