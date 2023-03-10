<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVA AREA"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <area-form
            v-model="area"
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
import AreaForm from './Form.vue'

export default {
  components: { AreaForm },

  data () {
    return {
      area: {
        area_name: '',
        area_code: '',
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  methods: {
    ...mapActions({
      createArea: 'areas/create',
    }),
    handleSubmit () {
      this.isLoading = true
      this.createArea({ payload: this.area }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Area creata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/aree')
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
