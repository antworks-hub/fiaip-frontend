<template>
  <card v-if="value">
    <ValidationObserver ref="form">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="description"
              rules="required"
              mode="eager"
            >
              <base-text
                :value="value.description"
                required
                type="text"
                label="Descrizione"
                placeholder="Descrizione"
                :error="errors[0] || (apiErrors['description'] && apiErrors['description'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['description']) }, { 'has-danger': (failed || apiErrors['description']) }]"
                @input="updateValue('description', $event)"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="base_flag"
              mode="eager"
            >
              <base-checkbox
                value="1"
                :checked="value.base_flag == 1"
                :error="errors[0] || (apiErrors['base_flag'] && apiErrors['base_flag'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['base_flag']) }, { 'has-danger': (failed || apiErrors['base_flag']) }]"
                @input="updateValue('base_flag', $event)"
              >Base</base-checkbox>
            </ValidationProvider>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="renovation_flag"
              mode="eager"
            >
              <base-checkbox
                value="1"
                :checked="value.renovation_flag == 1"
                :error="errors[0] || (apiErrors['renovation_flag'] && apiErrors['renovation_flag'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['renovation_flag']) }, { 'has-danger': (failed || apiErrors['renovation_flag']) }]"
                @input="updateValue('renovation_flag', $event)"
              >Rinnovamento</base-checkbox>
            </ValidationProvider>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="number"
              rules="required"
              mode="eager"
            >
              <base-input
                :value="value.number"
                required
                type="number"
                label="Numero"
                placeholder="Numero"
                :error="errors[0] || (apiErrors['number'] && apiErrors['number'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['number']) }, { 'has-danger': (failed || apiErrors['number']) }]"
                @input="updateValue('number', $event)"
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
          base_flag: false,
          renovation_flag: false,

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
        text: `L'eliminazione dell'Elemento "${this.value.description}" sarà irreversibile.`,
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
