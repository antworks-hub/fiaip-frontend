<template>
    <div>
        <simple-wizard 
            ref="wizard" 
            next-button-text="Avanti" 
            prev-button-text="Indietro" 
            :has-top-summary="hasTopSummary"
            :show-custom-buttons="true"
            @tab-change="tabChange"
        >
            <template slot="header">
                <h3 class="card-title text-left">Inserimento nuovo calcolo</h3>
            </template>
        
            <template #topSummary>
                <TopSummary :computation="value"></TopSummary>
            </template>
        
            <template #customButtons>
                <div class="col-12 mt-4">
                    <div class="pull-right">
                        <base-button type="primary" wide class="btn-next" :disabled="isLoading" @click="$emit('cancelComputation')">
                            Annulla
                        </base-button>
                        <base-button type="primary" wide class="btn-next" :disabled="nextButtonDisabledStatus" @click="$refs.wizard.nextTab()">
                            Avanti
                        </base-button>
                        <base-button type="primary" wide class="btn-next" :disabled="saveButtonDisabledStatus" :loading="isLoading" @click="$emit('saveComputation')">
                            Calcolo
                        </base-button>
                    </div>
        
                    <div class="pull-left">
                        <base-button wide type="primary" class="btn-previous" :disabled="prevButtonDisabledStatus" @click.native="$refs.wizard.prevTab()">
                            Indietro
                        </base-button>
                    </div>
                </div>
            </template>
        
            <wizard-tab :before-change="() => validateStep('step1')">
                <template slot="label">
                    <i class="tim-icons icon-single-02"></i>
                    <p>Immobile</p>
                </template>
                <step1 
                    ref="step1"
                    :computation="value"
                    @setNameOrCode="setNameOrCode($event)"
                    @setStreet="setStreet($event)"
                    @setStreetNumber="setStreetNumber($event)"
                    @setActualStreetNumber="setActualStreetNumber($event)"
                    @setApartmentNumber="setApartmentNumber($event)"
                    @setStair="setStair($event)"
                />
            </wizard-tab>

            <wizard-tab :before-change="() => validateStep('step2')">
                <template slot="label">
                    <i class="tim-icons icon-align-left-2"></i>
                    <p style="min-width: 150px">Contratto</p>
                </template>
                <step2 ref="step2"
                    :computation="value"
                    @setContractType="setContractType($event)"
                    @setForniture="setForniture($event)"
                    @setConstraint="setConstraint($event)"
                    @setSurface="setSurface($event)"
                />
            </wizard-tab>

           <wizard-tab :before-change="() => validateStep('step3')">
              <template slot="label">
                  <i class="tim-icons icon-credit-card"></i>
                  <p>Elementi caratteristici</p>
              </template>
              <step3 ref="step3"
                  :computation="value"
                  @setElements="setElements($event)"
              />
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step4')">
              <template slot="label">
                  <i class="tim-icons icon-delivery-fast"></i>
                  <p style="min-width: 150px">Calcolo del canone di locazione</p>
              </template>
              <step4 ref="step4"
                  :computation="value"
              />
          </wizard-tab>

        </simple-wizard>
    </div>
</template>

<script>
import TopSummary from './Components/TopSummary.vue'
import { Step1, Step2, Step3, Step4 } from './Steps/steps.js'
import { SimpleWizard, WizardTab } from '@/theme/components/index'

export default {
    props: {
        value: {
            type: Object,
            default: () => {
                return {
                    user: null,
                    name_or_code: null,
                    area: null,
                    district: null,
                    location_range: null,
                    street: null,
                    street_number: null,
                    zip_code: null,
                    elements: [],
                    actual_street_number: null,
                    apartment_number: null,
                    stair: null,
                    contract_type: null,
                    forniture: null,
                    constraint: null,
                    surface: null
                }
            }
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        apiErrors: {
            type: [Object, String],
            default: () => {
                return {}
            }
        }
    },

    components: {
        Step1,
        Step2,
        Step3,
        Step4,
        TopSummary,
        SimpleWizard,
        WizardTab
    },

    data() {
        return {
            activeTab: "0"
        }
    },

    computed: {
        hasTopSummary() {
            return true;
        },
        nextButtonDisabledStatus() {
            if(this.isLoading) {
                return true
            } else {
                switch(String(this.activeTab)) {
                    case "0":
                        return this.$refs["step1"] && !this.$refs["step1"].validate()
                    case "1":
                        return this.$refs["step2"] && !this.$refs["step2"].validate()
                    case "2":
                        return this.$refs["step3"] && !this.$refs["step3"].validate()
                    case "3":
                        return this.$refs["step4"] && !this.$refs["step4"].validate()
                    default:
                        return false
                }
            }
        },
        prevButtonDisabledStatus() {
          if(this.isLoading) {
              return true
          } else {
              switch(String(this.activeTab)) {
                case "0":
                  return true
                default:
                  return false;
              }
          }
        },
        saveButtonDisabledStatus() {
          if(this.isLoading) {
            return true
          } else {
            switch(String(this.activeTab)) {
              case "4":
                return true
              default:
                return false;
            }
          }
        },
    },

    methods: {
        setStreet(street) {
            let computation = { ...this.value }
            computation.street = street
            this.$emit('input', computation)
        },
        setNameOrCode(nameOrCode) {
            let computation = { ...this.value }
            computation.name_or_code = nameOrCode
            this.$emit('input', computation)
        },
        setStreetNumber(streetNumber) {
            let computation = { ...this.value }
            computation.street_number = streetNumber
            this.$emit('input', computation)
        },
        setActualStreetNumber(actualStreetNumber) {
            let computation = { ...this.value }
            computation.actual_street_number = actualStreetNumber
            this.$emit('input', computation)
        },
        setApartmentNumber(apartmentNumber) {
            let computation = { ...this.value }
            computation.apartment_number = apartmentNumber
            this.$emit('input', computation)
        },
        setStair(stair) {
            let computation = { ...this.value }
            computation.stair = stair
            this.$emit('input', computation)
        },
        setContractType(contractType) {
            let computation = { ...this.value }
            computation.contract_type = contractType
            this.$emit('input', computation)
        },
        setForniture(forniture) {
            let computation = { ...this.value }
            computation.forniture = forniture
            this.$emit('input', computation)
        },
        setConstraint(constraint) {
            let computation = { ...this.value }
            computation.constraint = constraint
            this.$emit('input', computation)
        },
        setSurface(surface) {
            let computation = { ...this.value }
            computation.surface = surface
            this.$emit('input', computation)
        },
        setElements(elements) {
            let computation = { ...this.value }
            computation.elements = elements
            this.$emit('input', computation)
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        },
        tabChange(oldTab, newTab) {
            this.activeTab = newTab.tabId
        },
        validateStep(ref) {
            return this.$refs[ref].validate();
        }
    }
}
</script>