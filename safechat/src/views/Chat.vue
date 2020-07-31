<template>
  <q-page ref="Chat" :class="$q.dark.isActive ? 'chatdark flex column' : 'chatlight flex column'">
    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-grey-4 text-center fixed-top"
    >{{ otherUserDetails.name }} : offline.</q-banner>
    <!-- overlay in q-drawer-->
    <!-- 
    <q-drawer v-model="left" side="left" elevated>
      <users />
    </q-drawer>-->

    <div :class="{ 'invisible' : !showMessages }" class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        :bg-color="message.from == 'me' ? 'amber-7' : 'primary'"
        :text-color="message.from == 'me' ? 'black' : 'white'"
        :stamp="getStamp(message.timestamp)"
      />
    </div>
    <q-footer elevated style="background-color: #010101">
      <q-toolbar>
        <q-form @submit.prevent.stop="sendMessage" class="full-width">
          <q-input
            v-model="newMessage"
            ref="newMessage"
            :bg-color="$q.dark.isActive ? 'grey' : 'white'"
            outlined
            rounded
            label="Message"
            @keydown.enter.prevent="sendMessage"
            dense
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                type="submit"
                color="white"
                icon="send"
                @click.prevent.stop="sendMessage"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import users from "./Users";
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "@/mixins/OtherUserDetails.js";
let min_diff, hour_diff

export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: "",
      showMessages: false
    };
  },

  components: {
    users
  },

  computed: {
    ...mapState("store", ["messages", "userDetails"])
  },
  methods: {
    ...mapActions("store", [
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
      "firebaseSendMessage"
    ]),
    sendMessage() {
      if (this.newMessage != "") {
        console.log("sending message", new Date().toLocaleString());
        this.firebaseSendMessage({
          message: {
            text: this.newMessage,
            timestamp: new Date().toLocaleString(),
            from: "me"
          },
          otherUserId: this.$route.params.otherUserId
        });
        this.clearMessage();
      }
    },
    clearMessage() {
      this.newMessage = "";
      this.$refs.newMessage.focus();
    },
    scrollToBottom() {
      let chat = this.$refs.Chat.$el;
      setTimeout(() => {
        window.scrollTo(0, chat.scrollHeight);
      }, 20);
    },
    getStamp(timestamp) {
      return timestamp
      // try {
      //   min_diff =
      //     (new Date(new Date().toLocaleString()).getTime() -
      //       new Date(timestamp).getTime()) /
      //     (1000 * 60);
      //   if (min_diff <= 60) return Math.floor(min_diff) + " minutes ago";
      //   hour_diff = min_diff / 60;
      //   if (hour_diff <= 24) return Math.floor(hour_diff) + " hours ago";
      //   return Math.floor(hour_diff / 24) + " days ago";
      // } catch (err) {
      //   console.log(err);
      //   return "30 minutes ago";
      // }
    }
  },
  watch: {
    messages: function(val) {
      if (Object.keys(val).length) {
        this.scrollToBottom();
        setTimeout(() => {
          this.showMessages = true;
        }, 200);
      }
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId);
  },
  destroyed() {
    this.firebaseStopGettingMessages();
  }
};
</script>

<style lang='scss'>

$light: #e2dfd5;
$white: #fff;
$beige: #c0c0c0;
$dark: #000; 
$grey : #282828;
$lightgrey: #484848;

.chatlight {
  background:$light;
}
.chatlight:after {
  content: "";
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.1;
  background-image: radial-gradient(
      circle at 100% 150%,
      $beige 35%,
      $white 25%,
      $white 28%,
      $beige 29%,
      $beige 36%,
      $white 36%,
      $white 40%,
      transparent 40%,
      transparent
    ),
    radial-gradient(
      circle at 0 150%,
      $beige 24%,
      $white 25%,
      $white 28%,
      $beige 29%,
      $beige 36%,
      $white 36%,
      $white 40%,
      transparent 40%,
      transparent
    ),
    radial-gradient(
      circle at 50% 100%,
      $white 10%,
      $beige 11%,
      $beige 23%,
      $white 24%,
      $white 30%,
      $beige 31%,
      $beige 43%,
      $white 44%,
      $white 50%,
      $beige 51%,
      $beige 63%,
      $white 64%,
      $white 71%,
      transparent 71%,
      transparent
    ),
    radial-gradient(
      circle at 100% 50%,
      $white 5%,
      $beige 6%,
      $beige 15%,
      $white 16%,
      $white 20%,
      $beige 21%,
      $beige 30%,
      $white 31%,
      $white 35%,
      $beige 36%,
      $beige 45%,
      $white 46%,
      $white 49%,
      transparent 50%,
      transparent
    ),
    radial-gradient(
      circle at 0 50%,
      $white 5%,
      $beige 6%,
      $beige 15%,
      $white 16%,
      $white 20%,
      $beige 21%,
      $beige 30%,
      $white 31%,
      $white 35%,
      $beige 36%,
      $beige 45%,
      $white 46%,
      $white 49%,
      transparent 50%,
      transparent
    );
  background-size: 100px 50px;
}

.chatdark {
  background:$dark;
}
.chatdark:after {
  content: "";
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.1;
  background-image: radial-gradient(
      circle at 100% 150%,
      $lightgrey 35%,
      $grey 25%,
      $grey 28%,
      $lightgrey 29%,
      $lightgrey 36%,
      $grey 36%,
      $grey 40%,
      transparent 40%,
      transparent
    ),
    radial-gradient(
      circle at 0 150%,
      $lightgrey 24%,
      $grey 25%,
      $grey 28%,
      $lightgrey 29%,
      $lightgrey 36%,
      $grey 36%,
      $grey 40%,
      transparent 40%,
      transparent
    ),
    radial-gradient(
      circle at 50% 100%,
      $grey 10%,
      $lightgrey 11%,
      $lightgrey 23%,
      $grey 24%,
      $grey 30%,
      $lightgrey 31%,
      $lightgrey 43%,
      $grey 44%,
      $grey 50%,
      $lightgrey 51%,
      $lightgrey 63%,
      $grey 64%,
      $grey 71%,
      transparent 71%,
      transparent
    ),
    radial-gradient(
      circle at 100% 50%,
      $grey 5%,
      $lightgrey 6%,
      $lightgrey 15%,
      $grey 16%,
      $grey 20%,
      $lightgrey 21%,
      $lightgrey 30%,
      $grey 31%,
      $grey 35%,
      $lightgrey 36%,
      $lightgrey 45%,
      $grey 46%,
      $grey 49%,
      transparent 50%,
      transparent
    ),
    radial-gradient(
      circle at 0 50%,
      $grey 5%,
      $lightgrey 6%,
      $lightgrey 15%,
      $grey 16%,
      $grey 20%,
      $lightgrey 21%,
      $lightgrey 30%,
      $grey 31%,
      $grey 35%,
      $lightgrey 36%,
      $lightgrey 45%,
      $grey 46%,
      $grey 49%,
      transparent 50%,
      transparent
    );
  background-size: 100px 50px;
}

.q-banner {
  top: 50px;
  z-index: 2;
  opacity: 0.8;
}
.q-message {
  z-index: 1;
}
</style>

