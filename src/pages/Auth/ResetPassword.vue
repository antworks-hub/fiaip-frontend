<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <card class="card-login card-white bg-vitevini">
            <template slot="header">
              <img src="img/site/app-logo.png" alt="">
            </template>
            <div>
              <div class="d-flex mb-3">
                <h4 class="w-100 text-center">
                  {{ firstAccess ? 'Imposta Password' : 'Reimposta Password' }}
                </h4>
              </div>
              <ValidationProvider
                v-slot="{ passed, failed, errors }"
                name="password"
                rules="required|min:8"
                mode="eager"
              >
                <base-input
                  v-model="formData.password"
                  required
                  placeholder="Password"
                  addon-left-icon="tim-icons icon-lock-circle"
                  type="password"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                  @input="apiErrors = []"
                />
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ passed, failed, errors }"
                name="password_confirmation"
                rules="required|min:8|confirmed:password"
                mode="eager"
              >
                <base-input
                  v-model="formData.password_confirmation"
                  required
                  placeholder="Conferma Password"
                  addon-left-icon="tim-icons icon-lock-circle"
                  type="password"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                  @input="apiErrors = []"
                />
              </ValidationProvider>

              <div v-if="apiErrors.length > 0">
                <label v-for="error in apiErrors" :key="error" class="error">
                  {{ error }}
                </label>
              </div>
              <div v-if="success">
                <label class="success white">
                  Password {{ firstAccess ? 'Impostata' : 'Reimpostata' }}. Effettua il Log in.
                </label>
              </div>
            </div>

            <div slot="footer">
              <base-button
                v-if="!success"
                native-type="submit"
                type="neutral"
                class="mb-2 text-black"
                size="lg"
                :loading="loading"
                block
              >
                Invia
              </base-button>

              <div class="pull-right">
                <h6>
                  <router-link :to="{ name: 'Login' }" class="link footer-link">
                    Torna al login
                  </router-link>
                </h6>
              </div>
            </div>
          </card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>

import { extend } from 'vee-validate'
import { required, email, min, confirmed } from 'vee-validate/dist/rules'
import { mapActions } from 'vuex'

extend('email', email)
extend('min', min)

extend('required', required)
extend('confirmed', confirmed)

export default {
  data () {
    return {
      formData: {
        token: this.$route.query.token,
        email: this.$route.query.email,
        password: '',
        password_confirmation: ''
      },
      loading: false,
      firstAccess: this.$route.query.first_access,
      success: false,
      apiErrors: []
    }
  },
  created () {
    if (!this.$route.query.token || !this.$route.query.email) {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    ...mapActions({
      resetPassword: 'auth/resetPassword',
      setPassword: 'auth/setPassword'
    }),
    submit () {
      this.loading = true
      if (this.firstAccess) {
        this.setPassword(this.formData).then((res) => {
          this.loading = false
          this.success = true
        }).catch((err) => {
          this.loading = false
          if (err.response.status === 422) {
            this.apiErrors = [err.response.data.content.message]
          };
        })
      } else {
        this.resetPassword(this.formData).then((res) => {
          this.loading = false
          this.success = true
        }).catch((err) => {
          this.loading = false
          if (err.response.status === 422) {
            this.apiErrors = [err.response.data.content.message]
          };
        })
      }
    }
  }
}
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
