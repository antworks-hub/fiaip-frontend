<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA CIRCOSCRIZIONE"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <district-form
            :value="district"
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
import DistrictForm from './Form.vue'

export default {
  components: { DistrictForm },

  data () {
    return {
      userId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      district: 'districts/single',
    })
  },

  created () {
    this.districtId = this.$route.params.id
    this.getDistrict(this.districtId)
  },

  beforeDestroy () {
    this.clearDistrict()
  },

  methods: {
    ...mapActions({
      getDistrict: 'districts/get',
      updateDistrict: 'districts/update',
      deleteDistrict: 'districts/delete',
      clearDistrict: 'districts/resetSingle',
      updateValue: 'districts/updateValue',
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateDistrict({ id: this.districtId, payload: this.district }).then((res) => {
        this.$notify({
          message:
            'Circoscrizione aggiornata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.isLoading = false
        this.$router.push('/tabelle/circoscrizioni')
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteDistrict(this.districtId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Circoscrizione eliminata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/circoscrizioni')
      })
    }
  }
}
</script>
<style></style>
