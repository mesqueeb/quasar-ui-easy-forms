<template>
  <q-layout view="lhh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath !== '/'"
          flat
          dense
          round
          to="/"
          icon="home"
        />

        <q-toolbar-title>
          quasar-ui-easy-forms v{{ version }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container class="column flex-center">
      <router-view class="full-width" style="max-width: 900px;" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { version } from 'ui' // "ui" is aliased in quasar.conf.js

export default {
  name: 'MyLayout',

  data () {
    return {
      version
    }
  }
}
</script>
