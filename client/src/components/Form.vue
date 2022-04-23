<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import axios from "axios";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const name = ref("");
    const email = ref("");
    const phoneNumber = ref("");

    const userData = {
      nameData: name,
      emailData: email,
      phoneNumberData: phoneNumber,
    };

    async function sendingData() {
      try {
        let response = await axios
          .post("http://localhost:4000/email", userData)
          .then((res) => console.log(res));

        window.location.reload();
      } catch (err) {
        alert("Something went wrong!");
        console.log(err);
      }
    }

    const validateEmail = (value) => {
      // if there is a blank input
      if (!value) {
        return "You have to fill this field!";
      }

      // if the field is not valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "You have to give a valid email";
      }

      // if everythings good
      return true;
    };

    return {
      validateEmail,
      name,
      email,
      phoneNumber,
      userData,
      sendingData,
    };
  },
};
</script>

<template>
  <div class="container-fluid p-10">
    <div class="container-fluid flex justify-around text-center">
      <p class="text-white text-2xl p-5">
        <img src="../assets/logo.png" alt="" height="auto" width="90" />
        Send email
      </p>
    </div>
    <div class="container-fluid flex justify-around">
      <Form @submit="sendingData" class="bg-gray-800 p-10 px-16 rounded-md">
        <div>
          <label class="text-left block py-2 text-white">Name</label>
          <Field
            type="text"
            name="name"
            v-model="name"
            class="bg-gray-900 border border-gray-700"
          />
        </div>
        <div>
          <label class="text-left block py-2 text-white">Email</label>
          <Field
            type="email"
            name="email"
            :rules="validateEmail"
            v-model="email"
            class="bg-gray-900 border border-gray-700"
          />
          <ErrorMessage name="email" class="block text-red-700" />
        </div>
        <div>
          <label class="text-left block py-2 text-white">Phone number</label>
          <Field
            type="tel"
            name="phonenumber"
            v-model="phoneNumber"
            class="bg-gray-900 border border-gray-700"
          />
          <!-- <ErrorMessage name="phonenumber" class="block text-red-700" /> -->
        </div>
        <div class="container flex justify-around py-5">
          <button
            class="bg-green-500 p-2 w-28 rounded-md text-white hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </Form>
    </div>
    <div class="container-fluid flex justify-around py-10">
      <blockquote
        class="text-2xl font-semibold italic text-center text-slate-900"
      >
        Created by
        <span
          class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block"
        >
          <span class="relative text-white">Bakos Janos</span>
        </span>
      </blockquote>
    </div>
  </div>
</template>

<style scoped>
input {
  padding: 5px;
}
</style>
