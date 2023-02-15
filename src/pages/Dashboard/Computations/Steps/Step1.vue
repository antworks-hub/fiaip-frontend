<template>
  <div class="row">
    <div class="col-12 mt-3">

      <div class="row">
        <ValidationProvider
            v-slot="{ passed, failed, errors }"
            name="Nome cliente / Codice immobile"
            rules="required"
            mode="eager"
        >
          <base-input
              required
              type="text"
              label="Nome cliente / Codice immobile"
              placeholder="Nome cliente / Codice immobile"
              :error="errors[0] || (apiErrors['name_or_code'] && apiErrors['name_or_code'][0])"
              :class="[{ 'has-success': (passed && !apiErrors['name_or_code']) }, { 'has-danger': (failed || apiErrors['name_or_code']) }]"
              :value="computation.name_or_code"
              @input="$emit('setNameOrCode', $event)"
          />
        </ValidationProvider>
      </div>

      <div class="row">
        <ValidationProvider v-slot="{ passed, failed, errors }" name="Cerca il nome della Via / Piazza" rules="required" mode="eager">
          <base-select
              required
              :value="computation.street"
              size="large"
              label="Cerca il nome della Via / Piazza (almeno 2 lettere)"
              :items="streets"
              autocomplete="full_street_name"
              item-name="full_street_name"
              placeholder="Cerca il nome della Via / Piazza (almeno 2 lettere)"
              :error="errors[0] || (apiErrors['street_id'] && apiErrors['street_id'][0])"
              :class="[{ 'has-success': (passed && !apiErrors['street_id']) }, { 'has-danger': (failed || apiErrors['street_id']) }]"
              filterable
              @input="onStreetSelected($event)"
          />
        </ValidationProvider>
      </div>

      <div class="row">
        <ValidationProvider v-slot="{ passed, failed, errors }" name="Seleziona i numeri civici di appartenenza" rules="required" mode="eager">
          <base-select
              :disabled="!computation.street"
              required
              :value="computation.street_number"
              size="large"
              label="Seleziona i numeri civici di appartenenza"
              :items="streetNumbers"
              autocomplete="full_number"
              item-name="full_number"
              placeholder="Seleziona i numeri civici di appartenenza"
              :error="errors[0] || (apiErrors['street_number_id'] && apiErrors['street_number_id'][0])"
              :class="[{ 'has-success': (passed && !apiErrors['street_number_id']) }, { 'has-danger': (failed || apiErrors['street_number_id']) }]"
              @input="$emit('setStreetNumber', $event)"
          />
        </ValidationProvider>
      </div>

      <div class="row">
          <base-input
              type="text"
              label="Civico"
              placeholder="Civico"
              :value="computation.actual_street_number"
              @input="$emit('setActualStreetNumber', $event)"
          />
      </div>
      <div class="row">
        <base-input
            type="text"
            label="Interno"
            placeholder="Interno"
            :value="computation.apartment_number"
            @input="$emit('setApartmentNumber', $event)"
        />
      </div>
      <div class="row">
        <base-input
            type="text"
            label="Scala"
            placeholder="Scala"
            :value="computation.stair"
            @input="$emit('setStair', $event)"
        />
      </div>

    </div>
  </div>
</template>

<script>
import { ListTable, Modal } from '@/theme/components/index'
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        computation: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },

    components: {
        ListTable,
        Modal
    },

    data() {
        return {
            apiErrors: {},
            isLoading: false
        }
    },
    created() {
        this.fetchStreets()
    },
    beforeDestroy() {
        this.clearStreets(),
        this.clearStreetNumbers()
    },
    computed: {
        ...mapGetters({
            streets: 'streets/items',
            streetNumbers: 'streetNumbers/items'
        })
    },
    methods: {
        ...mapActions({
            fetchStreets: 'streets/fetch',
            fetchStreetNumbersByStreet: 'streetNumbers/fetchStreetNumbersByStreet',
            clearStreets: 'streets/resetItems',
            clearStreetNumbers: 'streetNumbers/resetItems',
        }),
        onStreetSelected(street) {
            this.$emit('setStreet', street)
            if (street) {
                this.fetchStreetNumbersByStreet(street)
            }
        },
        validate() {
            return this.computation
        },
        handleSubmit() {
            this.handleCreate()
        }
    }
}
</script>