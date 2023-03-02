<template>
  <card v-if="value">
    <ValidationObserver ref="form">
      <form @submit.prevent="submit">
        <div class="row" v-if="type == 'admin'">
          <div class="col-md-4">
            <label>Utente</label>
          </div>
          <div class="col-md-8">
            <label>{{ value.user.full_name }}</label>
          </div>
        </div>
        <div class="row" v-if="type == 'admin'">
          <div class="col-md-4">
            <label>Data inserimento</label>
          </div>
          <div class="col-md-8">
            <label>{{ value.date }}</label>
          </div>
        </div>
        <div class="row" v-if="type == 'admin'">
          <div class="col-md-12">
            <ValidationProvider v-slot="{ passed, failed, errors }" name="stato segnalazione" rules="required" mode="eager">
              <base-select
                  required
                  :value="value.error_status_id"
                  size="large"
                  label="Seleziona lo stato segnalazione"
                  :items="errorStatuses"
                  autocomplete="status"
                  item-name="status"
                  placeholder="Seleziona lo stato segnalazione"
                  :error="errors[0] || (apiErrors['error_status_id'] && apiErrors['error_status_id'][0])"
                  :class="[{ 'has-success': (passed && !apiErrors['error_status_id']) }, { 'has-danger': (failed || apiErrors['error_status_id']) }]"
                  @input="updateValue('error_status_id', $event)"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="title"
              rules="required|min:2"
              mode="eager"
            >
              <base-input
                :value="value.title"
                required
                type="text"
                label="Titolo"
                placeholder="Titolo"
                :error="errors[0] || (apiErrors['title'] && apiErrors['title'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['title']) }, { 'has-danger': (failed || apiErrors['title']) }]"
                @input="updateValue('title', $event)"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="text"
              rules="required|min:2"
              mode="eager"
            >
              <base-text
                :value="value.text"
                required
                type="text"
                label="Testo segnalazione"
                placeholder="Testo segnalazione"
                :error="errors[0] || (apiErrors['text'] && apiErrors['text'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['text']) }, { 'has-danger': (failed || apiErrors['text']) }]"
                @input="updateValue('text', $event)"
              />
            </ValidationProvider>
          </div>
        </div>

        <div class="row">
          <div class="col-12 mt-5 d-flex justify-content-end">
            <base-button v-if="isEdit && (type == 'admin' || value.error_status_id == 1)" :loading="isLoading" type="danger" class="btn-fill mr-auto" @click="handleDelete()">
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
          title: '',
          text: '',
          error_status_id: '',
        }
      }
    },
    user: {
      type: Object
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
    errorStatuses: [],
    type: {
      type: String,
      default: 'user'
    }
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
        text: `L'eliminazione della segnalazione "${this.value.title}" sarà irreversibile.`,
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
