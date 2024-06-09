<template>
  <div class="text-center mb-4 mt-5">
    <b-button variant="success" @click="showAddModal" class="mb-5">Ajouter un objet</b-button>
    <ObjectList @edit-object="showEditModal"></ObjectList>
    <ObjectForm
      :modal-id="'object-modal'"
      :object-to-edit="selectedObject"
      @object-saved="fetchObjects"
    ></ObjectForm>
  </div>
</template>


<script>
import ObjectList from '../components/home/ObjectList.vue';
import ObjectForm from '../components/home/ObjectForm.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    ObjectList,
    ObjectForm
  },
  data() {
    return {
      selectedObject: null
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
    }
  },
  mounted() {
    this.fetchObjects();
  }
};
</script>
