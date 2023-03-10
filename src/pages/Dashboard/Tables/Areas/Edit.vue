<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA AREA"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <area-form
            :value="area"
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
import AreaForm from './Form.vue'

export default {
  components: { AreaForm },

  data () {
    return {
      userId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      area: 'areas/single',
    })
  },

  created () {
    this.areaId = this.$route.params.id
    this.getArea(this.areaId)
  },

  beforeDestroy () {
    this.clearArea()
  },

  methods: {
    ...mapActions({
      getArea: 'areas/get',
      updateArea: 'areas/update',
      deleteArea: 'areas/delete',
      clearArea: 'areas/resetSingle',
      updateValue: 'areas/updateValue',
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateArea({ id: this.areaId, payload: this.area }).then((res) => {
        this.$notify({
          message:
            'Area aggiornata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.isLoading = false
        this.$router.push('/tabelle/aree')
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteArea(this.areaId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Area eliminata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/tabelle/aree')
      })
    }
  }
}
</script>
<style></style>
