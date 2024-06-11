<template>
  <div class="container">
    <div class="centered-table">
      <b-table striped hover :items="objects" :fields="fields">
        <template #cell(actions)="data">
          <b-button size="sm" variant="primary" @click="editObject(data.item)">Modifier</b-button>
          <b-button size="sm" variant="danger" @click="confirmDelete(data.item)">Supprimer</b-button>
        </template>
      </b-table>
    </div>
    <ConfirmDeleteModal
      ref="deleteModal"
      :itemName="currentItemToDelete.name"
      @confirm-delete="performDelete"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.vue';

const INITIAL_VALUE = {
  _id: null,
  name: null,
  description: null
};

export default {
  components: {
    ConfirmDeleteModal
  },
  data() {
    return {
      currentItemToDelete: { ...INITIAL_VALUE }
    };
  },
  computed: {
    ...mapState('objects', ['objects']),
    fields() {
      return [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'actions', label: 'Actions' }
      ];
    }
  },
  methods: {
    ...mapActions('objects', ['deleteObject']),
    editObject(object) {
      this.$emit('edit-object', object);
    },
    confirmDelete(item) {
      this.currentItemToDelete = item;
      this.$refs.deleteModal.show();
    },
    performDelete() {
      if (this.currentItemToDelete._id) {
        this.deleteObject(this.currentItemToDelete._id);
        this.currentItemToDelete = { ...INITIAL_VALUE };
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  height: 100vh;
}

.centered-table {
  width: 80%;
}
</style>
