<template>
  <div>
    <b-form @submit.prevent="submitForm" class="rounded p-4 shadow">
      <b-form-group label="Nom d'utilisateur" label-for="username-input" :state="validateUsername">
        <b-form-input id="username-input" v-model="username" required placeholder="Entrez votre nom d'utilisateur"></b-form-input>
      </b-form-group>
      <b-form-group label="Adresse Email" label-for="email-input" :state="validateEmail">
        <b-form-input type="email" id="email-input" v-model="email" required placeholder="Entrez votre adresse email"></b-form-input>
      </b-form-group>
      <b-form-group label="Mot de passe" label-for="password-input" :state="validatePassword">
        <b-form-input type="password" id="password-input" v-model="password" required placeholder="Entrez votre mot de passe" ></b-form-input>
      </b-form-group>
      <b-form-group label="Confirmation du mot de passe" label-for="confirm-password-input" :state="validateConfirmPassword">
        <b-form-input type="password" id="confirm-password-input" v-model="confirmPassword" required placeholder="Confirmez votre mot de passe"></b-form-input>
        <b-form-invalid-feedback :state="validateConfirmPassword">Mot de passe pas identique: Veuillez confirmer votre mot de passe.</b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary" block>Inscription</b-button>
      <p class="mt-2 text-center">Vous avez déjà un compte ? <b-link @click="goToLogin" class="text-primary">Se Connecter</b-link></p>
    </b-form>
    <b-toast v-model="showErrorAlert" :auto-hide-delay="3000" no-fade>
      <div class="p-2 bg-danger text-light rounded d-flex justify-content-between">
        <div class="mr-2">{{ errorMessage }}</div>
      </div>
    </b-toast>
  </div>
</template>

<script>
import { BToast, BForm, BFormGroup, BFormInput, BFormInvalidFeedback } from 'bootstrap-vue';
import AuthService from '../../services/authService';

export default {
  components: {
    BToast,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showErrorAlert: false,
      errorMessage: ""
    };
  },
  computed: {
    validateUsername() {
      return this.username.length > 0;
    },
    validateEmail() {
      return /\S+@\S+\.\S+/.test(this.email);
    },
    validatePassword() {
      return this.password.length > 0;
    },
    validateConfirmPassword() {
      return this.confirmPassword === this.password;
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await AuthService.signup(this.username, this.email, this.password);
        if (response) {
          this.$router.push('/login');
        }
      } catch (error) {
        this.errorMessage = error;
        this.showErrorAlert = true;
        console.error(error);
      }
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>
