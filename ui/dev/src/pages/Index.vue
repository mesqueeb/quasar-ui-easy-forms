<template>
  <q-page padding class="row justify-center">
    <q-list dense class="list">
      <div class="text-h4 q-my-md">< EasyForm /></div>
      <div class="q-my-md">Generate an entire form via just a "schema" object</div>
      <q-item
        v-for="page in pagesEasyForm"
        :key="page.path"
        :to="page.path"
      >
        <q-item-section avatar>
          <q-icon name="pages" />
        </q-item-section>
        <q-item-section>
          {{ page.title }}
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
      <div class="text-h4 q-mb-md q-mt-xl">< EasyField /></div>
      <div class="q-my-md">All possible single <b>fields</b> used inside an EasyForm.</div>
      <q-item
        v-for="page in pagesEasyField"
        :key="page.path"
        :to="page.path"
      >
        <q-item-section avatar>
          <q-icon name="pages" />
        </q-item-section>
        <q-item-section>
          {{ page.title }}
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import pages from '../router/pages'

const orderEasyFormPages = [
  'Basic',
  'Advanced',
  'Action Buttons',
  'Evaluated Props',
  'Events',
]
const pagesEasyForm = orderEasyFormPages
  .map(name => pages.find(p => p.title === name))

const orderEasyFieldPages = ['Easy Field']
const pagesEasyField = orderEasyFieldPages
  .map(name => pages.find(p => p.title === name))

export default {
  name: 'PageIndex',
  data () {
    return {
      pagesEasyForm,
      pagesEasyField,
    }
  }
}
</script>

<style lang="sass" scoped>
.list
  width: 700px
  max-width: 100%
</style>
