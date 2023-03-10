<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA CIVICO"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <street-number-form
            :value="streetNumber"
            :api-errors="apiErrors"
            :is-loading="isLoading"
            :areas="areas"
            :streets="streets"
            :districts="districts"
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
import StreetNumberForm from './Form.vue'

export default {
  components: { StreetNumberForm },

  data () {
    return {
      userId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      streetNumber: 'streetNumbers/single',
      streets: 'streets/items',
      areas: 'areas/items',
      districts: 'districts/items',
    })
  },

  created () {
    this.streetNumberId = this.$route.params.id
    this.getStreetNumber(this.streetNumberId)
    this.fetchStreets()
    this.fetchAreas()
    this.fetchDistricts()
  },

  beforeDestroy () {
    this.clearStreetNumber()
    this.clearStreets()
    this.clearAreas()
    this.clearDistricts()
  },

  methods: {
    ...mapActions({
      getStreetNumber: 'streetNumbers/get',
      updateStreetNumber: 'streetNumbers/update',
      deleteStreetNumber: 'streetNumbers/delete',
      clearStreetNumber: 'streetNumbers/resetSingle',
      updateValue: 'streetNumbers/updateValue',
      fetchStreets: 'streets/fetch',
      clearStreets: 'streets/resetSingle',
      fetchAreas: 'areas/fetch',
      clearAreas: 'areas/resetSingle',
      fetchDistricts: 'districts/fetch',
      clearDistricts: 'districts/resetSingle',
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateStreetNumber({ id: this.streetNumberId, payload: this.streetNumber }).then((res) => {
        this.$notify({
          message:
            'Civico aggiornato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.isLoading = false
        this.$router.push('/tabelle/civici')
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteStreetNumber(this.streetNumberId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Civico eliminato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/civici')
      })
    }
  }
}
</script>
<style></style>
