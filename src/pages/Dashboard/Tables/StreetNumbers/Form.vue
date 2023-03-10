<template>
  <card v-if="value">
    <ValidationObserver ref="form">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="number_from"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.number_from"
                required
                type="text"
                label="Numero Da"
                placeholder="Numero Da"
                :error="errors[0] || (apiErrors['number_from'] && apiErrors['number_from'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['number_from']) }, { 'has-danger': (failed || apiErrors['number_from']) }]"
                @input="updateValue('number_from', $event)"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="number_to"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.number_to"
                required
                type="text"
                label="Numero A"
                placeholder="Numero A"
                :error="errors[0] || (apiErrors['number_to'] && apiErrors['number_to'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['number_to']) }, { 'has-danger': (failed || apiErrors['number_to']) }]"
                @input="updateValue('number_to', $event)"
              />
            </ValidationProvider>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="number_type"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.number_type"
                required
                type="text"
                label="Tipo Numero"
                placeholder="Tipo Numero"
                :error="errors[0] || (apiErrors['number_type'] && apiErrors['number_type'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['number_type']) }, { 'has-danger': (failed || apiErrors['number_type']) }]"
                @input="updateValue('number_type', $event)"
              />
            </ValidationProvider>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
                v-slot="{ passed, failed, errors }"
                name="street_id"
                rules="required"
                mode="eager"
            >
              <base-select
                  required
                  :value="value.street_id"
                  size="large"
                  label="Seleziona la Via"
                  :items="streets"
                  autocomplete="printable_street_name"
                  item-name="printable_street_name"
                  placeholder="Seleziona la Via"
                  :error="errors[0] || (apiErrors['street_id'] && apiErrors['street_id'][0])"
                  :class="[{ 'has-success': (passed && !apiErrors['street_id']) }, { 'has-danger': (failed || apiErrors['street_id']) }]"
                  @input="updateValue('street_id', $event)"
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
    streets: [],
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
        text: `L'eliminazione dei civici "${this.value.number_from} - ${this.value.number_to}" sarà irreversibile.`,
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
