<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVO ELEMENTO"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <element-form
            v-model="element"
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
import ElementForm from './Form.vue'

export default {
  components: { ElementForm },

  data () {
    return {
      element: {
        description: '',
        base_flag: false,
        renovation_flag: false,
        number: ''
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  methods: {
    ...mapActions({
      createElement: 'elements/create',
    }),
    handleSubmit () {
      this.isLoading = true
      this.createElement({ payload: this.element }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Elemento creato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/elementi')
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
