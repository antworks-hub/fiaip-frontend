<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA ELEMENTO"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <elements-form
            :value="element"
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
import ElementsForm from './Form.vue'

export default {
  components: { ElementsForm },

  data () {
    return {
      userId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      element: 'elements/single',
    })
  },

  created () {
    this.elementId = this.$route.params.id
    this.getElement(this.elementId)
  },

  beforeDestroy () {
    this.clearElement()
  },

  methods: {
    ...mapActions({
      getElement: 'elements/get',
      updateElement: 'elements/update',
      deleteElement: 'elements/delete',
      clearElement: 'elements/resetSingle',
      updateValue: 'elements/updateValue',
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateElement({ id: this.elementId, payload: this.element }).then((res) => {
        this.$notify({
          message:
            'Elemento aggiornato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.isLoading = false
        this.$router.push('/tabelle/elementi')
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteElement(this.elementId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Elemento eliminato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/elementi')
      })
    }
  }
}
</script>
<style></style>
