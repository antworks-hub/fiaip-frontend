<template>
  <card v-if="value">
    <ValidationObserver ref="form">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="first_name"
              rules="required|min:2"
              mode="eager"
            >
              <base-input
                :value="value.first_name"
                required
                type="text"
                label="Nome"
                placeholder="Nome"
                :error="errors[0] || (apiErrors['first_name'] && apiErrors['first_name'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['first_name']) }, { 'has-danger': (failed || apiErrors['first_name']) }]"
                @input="updateValue('first_name', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="last_name"
              rules="required|min:2"
              mode="eager"
            >
              <base-input
                :value="value.last_name"
                required
                type="text"
                label="Cognome"
                placeholder="Cognome"
                :error="errors[0] || (apiErrors['last_name'] && apiErrors['last_name'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['last_name']) }, { 'has-danger': (failed || apiErrors['last_name']) }]"
                @input="updateValue('last_name', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="email"
              rules="required|email"
              mode="eager"
            >
              <base-input
                :value="value.email"
                required
                type="email"
                label="Indirizzo Email"
                placeholder="Indirizzo Email"
                :error="errors[0] || (apiErrors['email'] && apiErrors['email'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['email']) }, { 'has-danger': (failed || apiErrors['email']) }]"
                @input="updateValue('email', $event)"
              />
            </ValidationProvider>
          </div>
        </div>

        <div v-if="isEdit" class="row">
          <div class="col-md-6 mb-3">
            <base-checkbox v-model="changePassword">
              Modifica Password
            </base-checkbox>
          </div>
        </div>

        <div v-if="changePassword && isEdit" class="row">
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="password"
              rules="required|min:8"
              mode="eager"
            >
              <base-input
                ref="password"
                :value="value.password"
                required
                label="Password"
                placeholder="Password"
                addon-left-icon="tim-icons icon-lock-circle"
                type="password"
                :error="errors[0] || (apiErrors['password'] && apiErrors['password'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['password']) }, { 'has-danger': (failed || apiErrors['password']) }]"
                @input="updateValue('password', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="conferma password"
              rules="required|min:8|confirmed:password"
              mode="eager"
            >
              <base-input
                :value="value.password_confirmation"
                required
                label="Conferma Password"
                placeholder="Conferma Password"
                addon-left-icon="tim-icons icon-lock-circle"
                type="password"
                :error="errors[0] || (apiErrors['password_confirmation'] && apiErrors['password_confirmation'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['password_confirmation']) }, { 'has-danger': (failed || apiErrors['password_confirmation']) }]"
                @input="updateValue('password_confirmation', $event)"
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
import { BaseSwitch } from 'src/theme/components/index'

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
    BaseSwitch
  },
  mixins: [
    FormUpdaterMixin
  ],
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          password: null,
          password_confirmation: null,
          active: true
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
    }
  },
  data () {
    return {
      changePassword: false
    }
  },
  computed: {
    isEdit () {
      return this.value.id != null
    }
  },
  watch: {
    changePassword (val) {
      if (!val) {
        this.updateValue('password', null)
        this.updateValue('password_confirmation', null)
      }
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
        text: `L'eliminazione di "${this.value.last_name}" sarà irreversibile.`,
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
