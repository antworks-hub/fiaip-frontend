<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVO CIVICO"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <street-number-form
            v-model="streetNumber"
            :api-errors="apiErrors"
            :is-loading="isLoading"
            :areas="areas"
            :streets="streets"
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
import StreetNumberForm from './Form.vue'

export default {
  components: { StreetNumberForm },

  data () {
    return {
      streetNumber: {
        number_from: '',
        number_to: '',
        number_type: ''
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      streets: 'streets/items',
      areas: 'areas/items',
      districts: 'districts/items',
    })
  },

  created(){
    this.fetchStreets()
    this.fetchAreas()
    this.fetchDistricts()
  },

  beforeDestroy () {
    this.clearStreets()
    this.clearAreas()
    this.clearDistricts()
  },

  methods: {
    ...mapActions({
      createStreetNumber: 'streetNumbers/create',
      fetchStreets: 'streets/fetch',
      clearStreets: 'streets/resetSingle',
      fetchAreas: 'areas/fetch',
      clearAreas: 'areas/resetSingle',
      fetchDistricts: 'districts/fetch',
      clearDistricts: 'districts/resetSingle',
    }),
    handleSubmit () {
      this.isLoading = true
      this.createStreetNumber({ payload: this.streetNumber }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Civico creato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/civici')
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
