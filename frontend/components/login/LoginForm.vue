<template>
  <div>
    <b-form @submit.prevent="submitForm" class="rounded p-4 shadow">
      <b-form-group label="Adresse Email" label-for="email-input" :state="validateEmail">
        <b-form-input type="email" id="email-input" v-model="email" required placeholder="Entrez votre adresse email"></b-form-input>
      </b-form-group>
      <b-form-group label="Mot de passe" label-for="password-input" :state="validatePassword">
        <b-form-input type="password" id="password-input" v-model="password" required placeholder="Entrez votre mot de passe" ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" block>Connexion</b-button>
      <p class="mt-2 text-center">Vous n'avez pas de compte ? <b-link @click="goToSignup" class="text-primary">S'enregistrer</b-link></p>
    </b-form>
    <b-toast v-model="showErrorAlert" :auto-hide-delay="3000" no-fade>
      <div class="p-2 bg-danger text-light rounded d-flex justify-content-between">
        <div class="mr-2">{{ errorMessage }}</div>
      </div>
    </b-toast>
  </div>
</template>

<script>
import { BToast, BForm, BFormGroup, BFormInput } from 'bootstrap-vue';
import { mapActions } from 'vuex';

export default {
  components: {
    BToast,
    BForm,
    BFormGroup,
    BFormInput
  },
  data() {
    return {
      email: '',
      password: '',
      showErrorAlert: false,
      errorMessage: ''
    };
  },
  computed: {
    validateEmail() {
      return /\S+@\S+\.\S+/.test(this.email);
    },
    validatePassword() {
      return this.password.length > 0;
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submitForm() {
    try {
      const response = await this.login({ email: this.email, password: this.password });
      if (response) {
        this.$router.push('/home');
      }
    } catch (error) {
      this.errorMessage = error;
      this.showErrorAlert = true;
    }
  },
    goToSignup() {
      this.$router.push('/signup');
    }
  }
};
</script>
