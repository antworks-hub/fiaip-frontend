<template>
  <card v-if="value">
    <ValidationObserver ref="form">
      <form @submit.prevent="submit" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="name"
              rules="required|min:2"
              mode="eager"
            >
              <base-input
                :value="value.name"
                required
                type="text"
                label="Nome"
                placeholder="Nome"
                :error="errors[0] || (apiErrors['name'] && apiErrors['name'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['name']) }, { 'has-danger': (failed || apiErrors['name']) }]"
                @input="updateValue('name', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <ValidationProvider v-slot="{ passed, failed, errors }" name="tipo allegato" rules="required" mode="eager">
              <base-select
                required
                :value="value.attachment_type_id"
                size="large"
                label="Seleziona il tipo di allegato"
                :items="attachmentTypes"
                autocomplete="type"
                item-name="type"
                placeholder="Seleziona il tipo di allegato"
                :error="errors[0] || (apiErrors['attachment_type_id'] && apiErrors['attachment_type_id'][0])"
                :class="[{ 'has-success': (passed && !apiErrors['attachment_type_id']) }, { 'has-danger': (failed || apiErrors['attachment_type_id']) }]"
                @input="updateValue('attachment_type_id', $event)"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <file-upload
              style="flex: 1 1 auto;"
              @change="onFileChange($event, '/product/document', value)"
              @remove="onFileChange(false, '/product/document', value)"
              :src="value.file"
              placeholder="Carica un allegato"
              select-text="Seleziona Allegato"
              change-text="Cambia"
              remove-text="Rimuovi"
            ></file-upload>
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
import { required } from 'vee-validate/dist/rules'
import { Select, Option } from 'element-ui'
import { BaseSwitch, FileUpload } from 'src/theme/components/index';
import AttachmentMixin from 'src/mixins/AttachmentMixin';
import FormUpdaterMixin from 'src/mixins/FormUpdaterMixin.js'
import swal from 'sweetalert2'

extend('required', required)

export default {
  components: {
    FileUpload,
    [Option.name]: Option,
    [Select.name]: Select,
    BaseSwitch
  },
  mixins: [
    FormUpdaterMixin,
    AttachmentMixin
  ],
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          name: '',
          attachment_type_id: '',
          file: {
            type: Object,
            default: () => {
              return {}
            }
          },
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
    selectedRadio: null,
    attachmentTypes: []
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
