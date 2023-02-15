<template>
    <div class="row">
        <div class="col-12 mt-3">

            <div class="row">
                <ValidationProvider v-slot="{ passed, failed, errors }" name="Seleziona la tipologia di contratto" rules="required" mode="eager">
                    <base-select
                        required
                        :value="computation.contract_type"
                        size="large"
                        label="Seleziona la tipologia di contratto"
                        :items="contractTypes"
                        autocomplete="type"
                        item-name="type"
                        placeholder="Seleziona la tipologia di contratto"
                        :error="errors[0] || (apiErrors['contract_type_id'] && apiErrors['contract_type_id'][0])"
                        :class="[{ 'has-success': (passed && !apiErrors['contract_type_id']) }, { 'has-danger': (failed || apiErrors['contract_type_id']) }]"
                        @input="$emit('setContractType', $event)"
                    />
                </ValidationProvider>
            </div>
            <div class="row">
                <ValidationProvider v-slot="{ passed, failed, errors }" name="Seleziona la tipologia di arredamento" rules="required" mode="eager">
                    <base-select
                        required
                        :value="computation.forniture"
                        size="large"
                        label="Seleziona la tipologia di arredamento"
                        :items="fornitures"
                        autocomplete="name"
                        item-name="name"
                        placeholder="Seleziona la tipologia di arredamento"
                        :error="errors[0] || (apiErrors['forniture_id'] && apiErrors['forniture_id'][0])"
                        :class="[{ 'has-success': (passed && !apiErrors['forniture_id']) }, { 'has-danger': (failed || apiErrors['forniture_id']) }]"
                        @input="$emit('setForniture', $event)"
                    />
                </ValidationProvider>
            </div>
            <div class="row">
                <ValidationProvider v-slot="{ passed, failed, errors }" name="Seleziona eventuali vincoli" rules="required" mode="eager">
                    <base-select
                        required
                        :value="computation.constraint"
                        size="large"
                        label="Seleziona eventuali vincoli"
                        :items="constraints"
                        autocomplete="name"
                        item-name="name"
                        placeholder="Seleziona eventuali vincoli"
                        :error="errors[0] || (apiErrors['constraint_id'] && apiErrors['constraint_id'][0])"
                        :class="[{ 'has-success': (passed && !apiErrors['constraint_id']) }, { 'has-danger': (failed || apiErrors['constraint_id']) }]"
                        @input="$emit('setConstraint', $event)"
                    />
                </ValidationProvider>
            </div>
            <div class="row">
                <ValidationProvider
                    v-slot="{ passed, failed, errors }"
                    name="Superficie"
                    rules="required"
                    mode="eager"
                >
                    <base-input
                        required
                        type="text"
                        label="Inserisci la superficie in metri quadri"
                        placeholder="Inserisci la superficie in metri quadri"
                        :error="errors[0] || (apiErrors['surface'] && apiErrors['surface'][0])"
                        :class="[{ 'has-success': (passed && !apiErrors['surface']) }, { 'has-danger': (failed || apiErrors['surface']) }]"
                        :value="computation.surface"
                        @input="$emit('setSurface', $event)"
                    />
                </ValidationProvider>
            </div>

        </div>
    </div>
</template>

<script>
import { ListTable, Modal } from '@/theme/components/index'
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        ListTable,
        Modal
    },

    props: {
      computation: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },

    data() {
        return {
            apiErrors: {},
            isLoading: false,
        }
    },
    created() {
        this.fetchContractTypes(),
        this.fetchFornitures(),
        this.fetchConstraints()
    },
    beforeDestroy() {
        this.clearFornitures(),
        this.clearContractTypes(),
        this.clearConstraints()
    },

    computed: {
        ...mapGetters({
            contractTypes: 'contractTypes/items',
            fornitures: 'fornitures/items',
            constraints: 'constraints/items'
        })
    },
    methods: {
        ...mapActions({
            fetchContractTypes: 'contractTypes/fetch',
            fetchFornitures: 'fornitures/fetch',
            fetchConstraints: 'constraints/fetch',
            clearContractTypes: 'contractTypes/resetItems',
            clearFornitures: 'fornitures/resetItems',
            clearConstraints: 'constraints/resetItems'
        }),
        validate() {
            return true;
        },
        handleSubmit() {
        },
    }
}
</script>