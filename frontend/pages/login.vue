

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <b-card class="border-0 shadow">
          <LoginTitle/>
          <LoginForm />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import LoginTitle from '~/components/login/LoginTitle.vue';
import LoginForm from '~/components/login/LoginForm.vue';

export default {
  components: {
    LoginTitle,
    LoginForm
  }
};
</script>
