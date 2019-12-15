<template>
  <div
    :class="[
      'show-more-wrapper',
      {
        '-overlayed': overlayed,
      },
    ]"
  >
    <div class="q-py-sm">
      <slot name="shown-content" />
      <div class="_inner-wrapper">
        <slot />
        <q-slide-transition>
          <div v-if="showingMore">
            <slot name="extra-content" />
          </div>
        </q-slide-transition>
        <div v-if="overlayed" class="_overlay"></div>
      </div>
    </div>
    <q-btn
      class="_show-more text-button reset-button cursor-pointer"
      flat
      @click="toggleShowMore"
      :icon-right="showingMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
    >
      {{ showingMore ? showLess : showMore }}
    </q-btn>
  </div>
</template>

<script>
export default {
  props: {
    showMore: {
      default: 'Show more',
      type: String,
    },
    showLess: {
      default: 'Show less',
      type: String,
    },
  },
  data () {
    return {
      showingMore: false,
    }
  },
  computed: {
    overlayed () {
      return !this.showingMore
    },
  },
  methods: {
    emitHeight () {
      this.$nextTick(() => {
        this.$emit('change-height')
      })
    },
    toggleShowMore () {
      this.showingMore = !this.showingMore
      setTimeout(this.emitHeight, 400)
    },
  },
}
</script>

<style lang="sass" scoped>
// $

.show-more-wrapper
  ._inner-wrapper
    position: relative
    transition: height 300ms // this doesn't work...
  ._show-more
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    min-height: 44px
    font-size: 12px !important
    color: $primary
    outline: none !important
  &.-overlayed
    ._inner-wrapper
      height: 165px
      overflow: hidden
    ._overlay
      z-index: 2
      position: absolute
      top: 0
      width: 100%
      height: 100%
      background: transparent
      background: linear-gradient(to bottom, rgba(white, 0) 0%, rgba(white, 0) 66%, white 100%)
</style>
