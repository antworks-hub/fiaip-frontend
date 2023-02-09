<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <card class="card-login card-white bg-vitevini">
            <template slot="header">
              <img src="img/site/ExactSciences-logo.png" alt="">
            </template>
            <div>
              <div class="d-flex mb-3">
                <h4 class="w-100 text-center">
                  Password Dimenticata
                </h4>
              </div>
              <ValidationProvider
                v-slot="{ passed, failed, errors }"
                name="email"
                rules="required|email"
                mode="eager"
              >
                <base-input
                  v-model="formData.email"
                  required
                  type="email"
                  placeholder="Email"
                  addon-left-icon="tim-icons icon-email-85"
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
                  È stata inviata un'email con le istruzioni per reimpostare la password.
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
import { required, email, min } from 'vee-validate/dist/rules'
import { mapActions } from 'vuex'

extend('email', email)
extend('min', min)

extend('required', required)

export default {
  data () {
    return {
      formData: {
        email: ''
      },
      loading: false,
      success: false,
      apiErrors: []
    }
  },
  methods: {
    ...mapActions({
      forgotPassword: 'auth/forgotPassword'
    }),
    submit () {
      this.loading = true
      this.forgotPassword(this.formData).then((res) => {
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
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
