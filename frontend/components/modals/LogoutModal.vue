<template>
  <b-modal ref="logoutModal" @ok="$emit('confirm-logout')">
    <template #modal-title>
      Confirmation de déconnexion
    </template>
    Êtes-vous sûr de vouloir vous déconnecter ?
  </b-modal>
</template>

<script>
export default {
  methods: {
    show() {
      this.$refs.logoutModal.show();
    }
  }
};
</script>
