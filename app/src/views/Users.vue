<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item v-for="(user, key) in users" :key="key" :to="'/chat/' + key" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">{{ user.name.charAt(0) }}</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge
            :color="user.online ? 'light-green-4' : 'grey-3'"
          >{{ user.online ? 'Online' : 'Offline' }}</q-badge>
        </q-item-section>
      </q-item>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="purple" icon="keyboard_arrow_up" direction="up">
        <q-fab-action color="primary" @click="onClick" icon="send">
          <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
            <strong>Help us make a better society. Share your reported texts with us for research purposes. Your name and ID will not be shared.</strong>
          </q-tooltip>
        </q-fab-action>
        <a href="https://pranjalyatiwari.kaissa.in">
          <q-fab-action color="secondary" icon="help">
            <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
              <strong>Help</strong>
            </q-tooltip>
          </q-fab-action>
        </a>
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("store", ["users"]),
  },
};
</script>

<style>
</style>
