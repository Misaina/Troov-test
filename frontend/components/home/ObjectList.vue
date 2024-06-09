<template>
  <div class="container">
    <div class="centered-table">
      <b-table striped hover :items="objects" :fields="fields">
        <template #cell(actions)="data">
          <b-button size="sm" variant="primary" @click="editObject(data.item)">Modifier</b-button>
          <b-button size="sm" variant="danger" @click="deleteObject(data.item._id)">Supprimer</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
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
