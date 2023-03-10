<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA ELEMENTO"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <location-ranges-form
            :value="locationRange"
            :api-errors="apiErrors"
            :is-loading="isLoading"
            :areas="areas"
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
import LocationRangesForm from './Form.vue'

export default {
  components: { LocationRangesForm },

  data () {
    return {
      userId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      locationRange: 'locationRanges/single',
      areas: 'areas/items',
      districts: 'districts/items'
    })
  },

  created () {
    this.locationRangeId = this.$route.params.id
    this.getLocationRange(this.locationRangeId)
    this.fetchAreas()
    this.fetchDistricts()
  },

  beforeDestroy () {
    this.clearElement()
    this.clearAreas()
    this.clearDistricts()
  },

  methods: {
    ...mapActions({
      getLocationRange: 'locationRanges/get',
      updateLocationRange: 'locationRanges/update',
      deleteLocationRange: 'locationRanges/delete',
      clearLocationRange: 'locationRanges/resetSingle',
      updateValue: 'locationRanges/updateValue',
      fetchAreas: 'areas/fetch',
      clearAreas: 'areas/resetSingle',
      fetchDistricts: 'districts/fetch',
      clearDistricts: 'districts/resetSingle'
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateLocationRange({ id: this.locationRangeId, payload: this.locationRange }).then((res) => {
        this.$notify({
          message:
            'Fascia aggiornata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.isLoading = false
        this.$router.push('/tabelle/fasce')
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteLocationRange(this.locationRangeId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Fascia eliminata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/fasce')
      })
    }
  }
}
</script>
<style></style>
