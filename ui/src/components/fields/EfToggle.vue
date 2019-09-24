<template>
  <div class="ef-toggle">
    <q-toggle
      :value="value"
      @input="val => $emit('input', val)"
      :disable="disable"
    />
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

// .ef-toggle

</style>

<script>
import { QToggle } from 'quasar'

export default {
  components: { QToggle },
  name: 'EfToggle',
  props: {
    value: Boolean,
    disable: Boolean,
  },
  computed: {},
  methods: {},
}
</script>
