<template>
  <div class="lock-screen d-flex justify-content-center align-items-center">
    <div class="wrapper wrapper-full-page">
      <div class="full-page">
        <div class="content">
          <zoom-center-transition
            :duration="200"
            mode="out-in"
          >
            <div class="container">
              <div class="col-12 ml-auto mr-auto">
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(submit)">
                    <card class="card-login card-white bg-vitevini d-flex justify-content-center align-items-center mt-4">
                      <template slot="header">
                        <img src="img/site/app-logo.png" alt="" width="250px">
                      </template>
                      <div>
                        <div class="d-flex">
                          <h4 class="w-100 text-center mb-4">
                            Inserisci la password per continuare
                          </h4>
                        </div>

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
                        <base-button native-type="submit" type="neutral" class="mb-3 text-black" size="lg" block>
                          Invia
                        </base-button>
                        <base-button type="neutral" class="mb-3 text-black" size="lg" block @click="doLogout">
                          Esci
                        </base-button>
                      </div>
                    </card>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </zoom-center-transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import { mapGetters, mapActions } from 'vuex'
import { ZoomCenterTransition } from 'vue2-transitions'

extend('email', email)
extend('min', min)
extend('required', required)

export default {
  name: 'LockScreen',

  components: {
    ZoomCenterTransition
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

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },

  watch: {
    user: {
      handler () {
        if (this.user) {
          this.formData.email = this.user.email
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions({
      login: 'auth/login',
      logout: 'auth/logout',
      toggleLockScreen: 'settings/toggleLockScreen'
    }),
    submit () {
      this.login(this.formData).then((res) => {
        this.toggleLockScreen()
      }).catch((err) => {
        if (err.response.status === 422) {
          this.apiErrors = [err.response.data.content.message]
        };
      })
    },
    doLogout () {
      this.logout().then((res) => {
        this.$router.push('/login')
        this.toggleLockScreen()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
