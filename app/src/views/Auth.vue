<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <center>
        <q-img
          transition="fade"
          :src="require('@/assets/chary.jpeg')"
          ratio="1"
          style="height: 200px; max-width: 300px; align='center';"
          spinner-color="white"
          class="rounded-borders"
        ></q-img>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <login-register :tab="tab" />
          </q-tab-panel>

          <q-tab-panel name="register">
            <login-register :tab="tab" />
          </q-tab-panel>
        </q-tab-panels>
      </center>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "login",
    };
  },
  components: {
    "login-register": require("@/components/LoginSignUp.vue").default,
  },
};
</script>

<style>
</style>
