import BaseInput from 'src/theme/components/Inputs/BaseInput.vue'
import BaseCurrencyInput from 'src/theme/components/Inputs/BaseCurrencyInput.vue'
import BaseSelect from 'src/theme/components/Inputs/BaseSelect.vue'
import BaseDropdown from 'src/theme/components/BaseDropdown.vue'
import CustomVideoPlayer from 'src/theme/components/CustomVideoPlayer.vue'
import Card from 'src/theme/components/Cards/Card.vue'
import BaseButton from 'src/theme/components/BaseButton.vue'
import BaseCheckbox from 'src/theme/components/Inputs/BaseCheckbox.vue'
import BaseRadio from 'src/theme/components/Inputs/BaseRadio.vue'
import TextEditor from 'src/theme/components/Editor/TextEditor.vue'
import PageHeader from 'src/theme/components/Headers/PageHeader.vue'
import VueCurrencyInput from 'vue-currency-input'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import { Input, InputNumber, Tooltip, Popover } from 'element-ui'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.use(CKEditor)
    Vue.component(BaseInput.name, BaseInput)
    Vue.component(BaseCurrencyInput.name, BaseCurrencyInput)
    Vue.component(BaseSelect.name, BaseSelect)
    Vue.component(BaseDropdown.name, BaseDropdown)
    Vue.component(Card.name, Card)
    Vue.component(BaseCheckbox.name, BaseCheckbox)
    Vue.component(BaseRadio.name, BaseRadio)
    Vue.component(BaseButton.name, BaseButton)
    Vue.component(Input.name, Input)
    Vue.component(InputNumber.name, InputNumber)
    Vue.component(TextEditor.name, TextEditor)
    Vue.component(CustomVideoPlayer.name, CustomVideoPlayer)
    Vue.component(PageHeader.name, PageHeader)
    Vue.use(VueCurrencyInput)
    Vue.use(Tooltip)
    Vue.use(Popover)
    Vue.component('ValidationProvider', ValidationProvider)
    Vue.component('ValidationObserver', ValidationObserver)
  }
}

export default GlobalComponents
