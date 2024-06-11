<template>
  <div class="text-center mb-4 mt-5" v-if="isLoggedIn">
    <b-button variant="warning" @click="confirmLogout" class="mb-5">Déconnexion</b-button>
    <b-button variant="success" @click="showAddModal" class="mb-5">Ajouter un objet</b-button>
    <ObjectList @edit-object="showEditModal"></ObjectList>
    <ObjectForm
      :modal-id="'object-modal'"
      :object-to-edit="selectedObject"
      @object-saved="fetchObjects"
    ></ObjectForm>
    <LogoutModal ref="logoutModal" @confirm-logout="logout"></LogoutModal>
  </div>
</template>

<script>
import ObjectList from '../components/home/ObjectList.vue';
import ObjectForm from '../components/home/ObjectForm.vue';
import LogoutModal from '../components/modals/LogoutModal.vue';
import { mapActions } from 'vuex';
import { isTokenExpired } from '../utils/tokenUtils'

export default {
  components: {
    ObjectList,
    ObjectForm,
    LogoutModal
  },
  data() {
    return {
      selectedObject: null,
      isLoggedIn: false
    };
  },
  methods: {
    ...mapActions('objects', ['fetchObjects']),
    showAddModal() {
      this.selectedObject = null;
      this.$bvModal.show('object-modal');
    },
    showEditModal(object) {
      this.selectedObject = object;
      this.$bvModal.show('object-modal');
    },
    confirmLogout() {
      this.$refs.logoutModal.show();
    },
    logout() {
      this.$store.commit('auth/CLEAR_AUTH');
      this.$router.push('/login');
    }
  },
  mounted() {
    if (isTokenExpired()) {
      return this.logout();
    }
    this.isLoggedIn = true;
    this.fetchObjects();
  }
}
</script>

