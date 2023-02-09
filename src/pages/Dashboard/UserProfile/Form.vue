<template>
  <card v-if="editUser">
    <h5 slot="header" class="title">
      Profilo
    </h5>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <div class="row">
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="name"
              rules="required|min:2"
              mode="eager"
            >
              <base-input
                v-model="editUser.name"
                required
                type="text"
                label="Nome"
                placeholder="Nome"
                :error="errors[0]"
                :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                @input="apiErrors = []"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-6">
            <base-input
              v-model="editUser.email"
              readonly
              type="email"
              label="Indirizzo Email"
              placeholder="Indirizzo Email"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <base-checkbox v-model="changePassword">
              Modifica Password
            </base-checkbox>
          </div>
        </div>

        <div v-if="changePassword" class="row">
          <div class="col-md-6">
            <ValidationProvider
              v-slot="{ passed, failed, errors }"
              name="password"
              rules="required|min:8"
              mode="eager"
            >
              <base-input
                ref="password"
                v-model="editUser.password"
                required
                label="Password"
                placeholder="Password"
                addon-left-icon="tim-icons icon-lock-circle"
                type="password"
                :error="errors[0]"
                :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                @input="apiErrors = []"
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
                v-model="editUser.password_confirmation"
                required
                label="Conferma Password"
                placeholder="Conferma Password"
                addon-left-icon="tim-icons icon-lock-circle"
                type="password"
                :error="errors[0]"
                :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                @input="apiErrors = []"
              />
            </ValidationProvider>
          </div>
        </div>

        <div v-if="apiErrors.length > 0" class="row">
          <div class="col-12">
            <label v-for="error in apiErrors" :key="error" class="error">
              {{ error }}
            </label>
          </div>
        </div>

        <base-button native-type="submit" type="primary" class="btn-fill">
          Save
        </base-button>
      </form>
    </ValidationObserver>
  </card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import { extend } from 'vee-validate'
import { required, email, min, confirmed } from 'vee-validate/dist/rules'

extend('email', email)
extend('min', min)
extend('confirmed', confirmed)
extend('required', required)

export default {
  data () {
    return {
      changePassword: false,
      editUser: null,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },

  watch: {
    changePassword (val) {
      this.editUser.password = null
      this.editUser.password_confirmation = null
    }
  },

  created () {
    this.editUser = Object.assign({}, this.user)
  },

  methods: {
    ...mapActions({
      updateProfile: 'auth/update'
    }),
    submit () {
      this.updateProfile(this.editUser).then((res) => {
        this.changePassword = false
        this.$notify({
          message:
            'Profilo aggiornato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      }).catch((err) => {
        if (err.response.status === 422) {
          this.apiErrors = [err.response.data.content.message]
        };
      })
    }
  }
}
</script>
<style></style>
