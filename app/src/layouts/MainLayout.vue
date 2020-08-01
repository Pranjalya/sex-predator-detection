<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-grey text-darkpurple">
      <q-toolbar>
        <q-btn
          dense
          icon="menu"
          @click="left = !left"
          label="Users"
          v-go-back.single
          v-if="$route.fullPath.includes('/chat')"
        />
        <q-btn
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <!-- v-if="$route.fullPath.includes('/chat')" -->
        <q-toolbar-title class="absolute-center">{{ title }}</q-toolbar-title>
        <q-btn class="absolute-right q-pr-sm" :label="!userDetails.name ? 'Login' : userDetails.name">
          <q-menu v-if="userDetails.name">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <q-avatar color="primary" text-color="white">{{ userDetails.name.charAt(0) }}</q-avatar>
                </q-avatar>

                <div
                  v-if="userDetails.name!=''"
                  class="text-subtitle1 q-mt-md q-mb-xs"
                >{{ userDetails.name }}</div>

                <q-btn
                  color="primary"
                  v-if="!userDetails.userId"
                  label="Login"
                  to="/auth"
                  push
                  size="sm"
                  v-close-popup
                />
                <q-btn
                  color="primary"
                  v-else
                  @click="logoutUser"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>

        <!-- <q-btn
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Logout"
        />
         q-pr-sm 

        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right"
          icon="account_circle"
          no-caps
          elevated
        >
          <span v-if="userDetails.name!=''">{{ userDetails.name }}</span>
          <span v-else>Login</span>
        </q-btn>-->
      </q-toolbar>
    </q-header>
    <!-- overlay in q-drawer -->
    <!-- <q-drawer v-model="left" side="left"  elevated> -->
    <!-- <users /> -->
    <!-- </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "@/mixins/OtherUserDetails.js";

export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      left: false,
    };
  },
  computed: {
    ...mapState("store", ["userDetails"]),
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "SafeChat";
      else if (currentPath.includes("/chat")) return this.otherUserDetails.name;
      else if (currentPath == "/auth") return "Login";
    },
  },
  methods: {
    ...mapActions("store", ["logoutUser"]),
  },
};
</script>