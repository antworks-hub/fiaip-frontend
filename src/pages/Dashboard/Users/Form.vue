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
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="address"
              mode="eager"
            >
              <base-input
                :value="value.address"
                type="text"
                label="Indirizzo"
                placeholder="Indirizzo"
                :error="errors[0] || (apiErrors['address'] && apiErrors['address'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['address']) }, { 'has-danger': (failed || apiErrors['address']) }]"
                @input="updateValue('address', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="agency_name"
              mode="eager"
            >
              <base-input
                :value="value.agency_name"
                type="text"
                label="Nome agenzia"
                placeholder="Nome agenzia"
                :error="errors[0] || (apiErrors['agency_name'] && apiErrors['agency_name'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['agency_name']) }, { 'has-danger': (failed || apiErrors['agency_name']) }]"
                @input="updateValue('agency_name', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="email_pec"
              mode="eager"
            >
              <base-input
                :value="value.email_pec"
                type="text"
                label="PEC"
                placeholder="PEC"
                :error="errors[0] || (apiErrors['email_pec'] && apiErrors['email_pec'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['email_pec']) }, { 'has-danger': (failed || apiErrors['email_pec']) }]"
                @input="updateValue('email_pec', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="phone_number"
              mode="eager"
            >
              <base-input
                :value="value.phone_number"
                type="text"
                label="Telefono"
                placeholder="Telefono"
                :error="errors[0] || (apiErrors['phone_number'] && apiErrors['phone_number'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['phone_number']) }, { 'has-danger': (failed || apiErrors['phone_number']) }]"
                @input="updateValue('phone_number', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="member_code"
              mode="eager"
            >
              <base-input
                :value="value.member_code"
                type="text"
                label="Codice associato"
                placeholder="Codice associato"
                :error="errors[0] || (apiErrors['member_code'] && apiErrors['member_code'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['member_code']) }, { 'has-danger': (failed || apiErrors['member_code']) }]"
                @input="updateValue('member_code', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <ValidationProvider v-slot="{ passed, failed, errors }" name="livello utente" rules="required" mode="eager">
              <base-select
                required
                :value="value.user_level_id"
                size="large"
                label="Seleziona il livello utente"
                :items="userLevels"
                autocomplete="level"
                item-name="level"
                placeholder="Seleziona il livello utente"
                :error="errors[0] || (apiErrors['user_level_id'] && apiErrors['user_level_id'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['user_level_id']) }, { 'has-danger': (failed || apiErrors['user_level_id']) }]"
                @input="updateValue('user_level_id', $event)"
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

        <div v-if="(changePassword && isEdit) || !isEdit" class="row">
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
          <div class="col-md-6">
            <ValidationProvider v-slot="{ passed, failed, errors }" name="utente attivo" rules="required" mode="eager">
              <base-checkbox
                required
                :checked="value.active"
                :error="errors[0] || (apiErrors['active'] && apiErrors['active'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['active']) }, { 'has-danger': (failed || apiErrors['active']) }]"
                @input="updateValue('active', $event)"
              >Utente Attivo
              </base-checkbox>
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
          email: '',
          first_name: '',
          last_name: '',
          password: '',
          password_confirmation: '',
          active: false,
          user_level_id: '',
          address: '',
          agency_name: '',
          email_pec: '',
          phone_number: '',
          member_code: ''
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
    userLevels: []
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
        text: `L'eliminazione di "${this.value.first_name} ${this.value.last_name}" sarà irreversibile.`,
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
