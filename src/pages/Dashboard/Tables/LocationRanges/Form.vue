<template>
  <card v-if="value">
    <ValidationObserver ref="form">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="min_value"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.min_value"
                required
                type="double"
                label="Valore Minimo"
                placeholder="Valore Minimo"
                :error="errors[0] || (apiErrors['min_value'] && apiErrors['min_value'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['min_value']) }, { 'has-danger': (failed || apiErrors['min_value']) }]"
                @input="updateValue('min_value', $event)"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="max_value"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.max_value"
                required
                type="double"
                label="Valore Massimo"
                placeholder="Valore Massimo"
                :error="errors[0] || (apiErrors['max_value'] && apiErrors['max_value'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['max_value']) }, { 'has-danger': (failed || apiErrors['max_value']) }]"
                @input="updateValue('max_value', $event)"
              />
            </ValidationProvider>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
                v-slot="{ passed, failed, errors }"
                name="area_id"
                rules="required"
                mode="eager"
            >
              <base-select
                  required
                  :value="value.area_id"
                  size="large"
                  label="Seleziona l'Area"
                  :items="areas"
                  autocomplete="area_name"
                  item-name="area_name"
                  placeholder="Seleziona l'Area"
                  :error="errors[0] || (apiErrors['area_id'] && apiErrors['area_id'][0])"
                  :class="[{ 'has-success': (passed && !apiErrors['area_id']) }, { 'has-danger': (failed || apiErrors['area_id']) }]"
                  @input="updateValue('area_id', $event)"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
                v-slot="{ passed, failed, errors }"
                name="district_id"
                rules="required"
                mode="eager"
            >
              <base-select
                  required
                  :value="value.district_id"
                  size="large"
                  label="Seleziona la Circoscrizione"
                  :items="districts"
                  autocomplete="district_name"
                  item-name="district_name"
                  placeholder="Seleziona la Circoscrizione"
                  :error="errors[0] || (apiErrors['district_id'] && apiErrors['district_id'][0])"
                  :class="[{ 'has-success': (passed && !apiErrors['district_id']) }, { 'has-danger': (failed || apiErrors['district_id']) }]"
                  @input="updateValue('district_id', $event)"
              />
            </ValidationProvider>
          </div>
        </div>

        <div class="row">
          <div class="col-12 mt-5 d-flex justify-content-end">
            <base-button v-if="isEdit" :loading="isLoading" type="danger" class="btn-fill mr-auto" @click="handleDelete()">
              Elimina
            </base-button>
            <base-button :loading="isLoading" native-type="submit" type="primary" class="btn-fill">
              Salva
            </base-button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </card>
</template>

<script>
import { extend } from 'vee-validate'
import { required, email, min, confirmed } from 'vee-validate/dist/rules'
import { Select, Option } from 'element-ui'
import { BaseSwitch, BaseText } from 'src/theme/components/index'

import FormUpdaterMixin from 'src/mixins/FormUpdaterMixin.js'

import swal from 'sweetalert2'

extend('email', email)
extend('min', min)
extend('confirmed', confirmed)
extend('required', required)

export default {
  components: {
    [Option.name]: Option,
    [Select.name]: Select,
    BaseSwitch,
    BaseText
  },
  mixins: [
    FormUpdaterMixin
  ],
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          number_from: '',
          number_to: '',
          number_type: '',
        }
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    apiErrors: {
      type: Object,
      default: () => {
        return {}
      }
    },
    areas: [],
    districts: []
  },
  computed: {
    isEdit () {
      return this.value.id != null
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.$emit('submit')
        } else {
          this.$notify({
            message: 'Sono presenti errori di validazione',
            timeout: 5000,
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        }
      })
    },
    handleDelete () {
      swal.fire({
        title: 'Sei sicuro?',
        text: `L'eliminazione della fascia "${this.value.min_value} - ${this.value.max_value}" sarà irreversibile.`,
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success btn-fill',
          cancelButton: 'btn btn-danger btn-fill'
        },
        confirmButtonText: 'Si, cancella',
        cancelButtonText: 'No, annulla',
        buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.$emit('delete')
        }
      })
    }
  }
}
</script>
