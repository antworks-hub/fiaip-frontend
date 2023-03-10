<template>
  <card v-if="value">
    <ValidationObserver ref="form">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="district_name"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.district_name"
                required
                type="text"
                label="Nome Circoscrizione"
                placeholder="Nome Circoscrizione"
                :error="errors[0] || (apiErrors['district_name'] && apiErrors['district_name'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['district_name']) }, { 'has-danger': (failed || apiErrors['district_name']) }]"
                @input="updateValue('district_name', $event)"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="district_number"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.district_number"
                required
                type="text"
                label="Codice Circoscrizione"
                placeholder="Codice Circoscrizione"
                :error="errors[0] || (apiErrors['district_number'] && apiErrors['district_number'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['district_number']) }, { 'has-danger': (failed || apiErrors['district_number']) }]"
                @input="updateValue('district_number', $event)"
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
          district_name: '',
          district_number: '',
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
        text: `L'eliminazione della cisrcoscrizione "${this.value.district_name}" sarà irreversibile.`,
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
