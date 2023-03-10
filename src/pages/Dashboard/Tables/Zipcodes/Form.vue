<template>
  <card v-if="value">
    <ValidationObserver ref="form">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="zip_code"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.zip_code"
                required
                type="text"
                label="Cap"
                placeholder="Cap"
                :error="errors[0] || (apiErrors['zip_code'] && apiErrors['zip_code'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['zip_code']) }, { 'has-danger': (failed || apiErrors['zip_code']) }]"
                @input="updateValue('zip_code', $event)"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="numbers"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.numbers"
                required
                type="text"
                label="Numeri"
                placeholder="Numeri"
                :error="errors[0] || (apiErrors['numbers'] && apiErrors['numbers'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['numbers']) }, { 'has-danger': (failed || apiErrors['numbers']) }]"
                @input="updateValue('numbers', $event)"
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
          zip_code: '',
          numbers: '',
          street_id: '',
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
        text: `L'eliminazione del cap "${this.value.zip_code}" sarà irreversibile.`,
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
