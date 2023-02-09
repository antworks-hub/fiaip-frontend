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
                  Area Agenti
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

              <ValidationProvider
                v-slot="{ passed, failed, errors }"
                name="password"
                rules="required|min:5"
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

              <div v-if="apiErrors.length > 0">
                <label v-for="error in apiErrors" :key="error" class="error">
                  {{ error }}
                </label>
              </div>
            </div>

            <div slot="footer">
              <base-button native-type="submit" type="neutral" class="mb-2 text-black" size="lg" block>
                Invia
              </base-button>

              <div class="pull-right">
                <h6>
                  <router-link :to="{ name: 'Password Dimenticata' }" class="link footer-link">
                    Password Dimenticata?
                  </router-link>
                </h6>
              </div>
            </div>
          </card>
        </form>
      </ValidationObserver>
    </div>

    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <card class="card-login card-white bg-vitevini">
        <h5 class="w-100 text-center">
          Se è il tuo primo accesso e non hai ancora la password per accedere, fai click qui:
        </h5>

        <router-link :to="{ name: 'Primo Accesso' }" class="link footer-link">
          <base-button type="neutral" class="mb-2 text-black" size="lg" block>
            Primo Accesso
          </base-button>
        </router-link>
      </card>
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
  metaInfo: {
    title: 'Tenders Database'
  },
  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      apiErrors: []
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    submit () {
      this.login(this.formData).then((res) => {
        this.$router.push({ name: 'Orders' })
      }).catch((err) => {
        if (err.response.status === 422 || err.response.status === 401) {
          this.apiErrors = [err.response.data.message]
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
