<template>
  <q-layout view="lhh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn v-if="$route.fullPath !== '/'" flat dense round to="/" icon="home" />

        <q-toolbar-title
          >quasar-ui-easy-forms
          <q-icon size="16px" class="q-pb-md" name="info">
            <q-tooltip size="md" content-style="font-size: 16px">
              demo versions:
              <div class="row">
                <div class="text-bold q-mr-xs" style="min-width: 70px">v{{ version }}</div>
                <div>quasar-ui-easy-forms</div>
              </div>
              <div class="row">
                <div class="text-bold q-mr-xs" style="min-width: 70px">v{{ $q.version }}</div>
                <div>quasar</div>
              </div>
            </q-tooltip>
          </q-icon></q-toolbar-title
        >

        <PrimaryColorPicker />
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
      version,
    }
  },
}
</script>
