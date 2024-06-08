<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <b-card class="border-0 shadow">
          <SignupTitle />
          <SignupForm />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import SignupTitle from '~/components/signup/SignupTitle.vue';
import SignupForm from '~/components/signup/SignupForm.vue';

export default {
  components: {
    SignupTitle,
    SignupForm
  }
}
</script>
