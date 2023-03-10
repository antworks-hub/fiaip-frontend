<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA CAP"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <zipcode-form
            :value="zipCode"
            :api-errors="apiErrors"
            :is-loading="isLoading"
            :streets="streets"
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
import ZipcodeForm from './Form.vue'

export default {
  components: { ZipcodeForm },

  data () {
    return {
      userId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      zipCode: 'zipCodes/single',
      streets: 'streets/items',
    })
  },

  created () {
    this.zipCodeId = this.$route.params.id
    this.getZipCode(this.zipCodeId)
    this.fetchStreets()
  },

  beforeDestroy () {
    this.clearZipCode()
    this.clearStreets()
  },

  methods: {
    ...mapActions({
      getZipCode: 'zipCodes/get',
      updateZipCode: 'zipCodes/update',
      deleteZipCode: 'zipCodes/delete',
      clearZipCode: 'zipCodes/resetSingle',
      updateValue: 'zipCodes/updateValue',
      fetchStreets: 'streets/fetch',
      clearStreets: 'streets/resetSingle'
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateZipCode({ id: this.zipCodeId, payload: this.zipCode }).then((res) => {
        this.$notify({
          message:
            'Cap aggiornato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.isLoading = false
        this.$router.push('/tabelle/cap')
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteZipCode(this.zipCodeId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Cap eliminato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/cap')
      })
    }
  }
}
</script>
<style></style>
