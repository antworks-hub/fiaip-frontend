export default {
  data () {
    return {
      newListItem: ''
    }
  },
  methods: {
    setupList (list, prop) {
      if (list.filter(listItem => !listItem.key).length > 0) {
        const listClone = [...list]
        listClone.forEach((listItem, i) => { listItem.key = (i + 1) })
        this.updateValue(prop, listClone)
      }
    },
    addListItem (list, prop, propName = 'name', localValueProp = 'newListItem', localKeyProp = null) {
      if (this[localValueProp]) {
        const key = localKeyProp ? this[localKeyProp] : list.length > 0 ? Math.max.apply(Math, list.map(function (o) { return o.key })) + 1 : 1
        const ordering = list.length > 0 ? Math.max.apply(Math, list.map(function (o) { return o.ordering })) + 1 : 1
        const item = {
          [propName]: this[localValueProp],
          key,
          ordering
        }
        this.updateValue(prop, [...new Set([...list, ...[item]])])
        this[localValueProp] = ''
        if (localKeyProp) { this[localKeyProp] = '' }
      }
    },
    addRawListItem (list, prop, localValueProp = 'newListItem') {
      this.updateValue(prop, [...new Set([...list, ...[this[localValueProp]]])])
      this[localValueProp] = ''
    },

    removeListItem (list, prop, index) {
      this.updateValue(prop, list.filter((el, idx) => idx !== index))
    },

    moveListItemUp (list, prop, index) {
      const indexes = [(index - 1), index]
      const listClone = [...list]
      listClone.splice(indexes[0], 2, list[indexes[1]], list[indexes[0]])
      listClone.forEach((listItem, i) => { listItem.ordering = (i + 1) })
      this.updateValue(prop, listClone)
    },

    moveListItemDown (list, prop, index) {
      const indexes = [index, (index + 1)]
      const listClone = [...list]
      listClone.splice(indexes[0], 2, list[indexes[1]], list[indexes[0]])
      listClone.forEach((listItem, i) => { listItem.ordering = (i + 1) })
      this.updateValue(prop, listClone)
    }
  }
}
