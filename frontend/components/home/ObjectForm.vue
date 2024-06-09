<template>
  <b-modal :id="modalId">
    <template #modal-title>
      {{ isEditing ? 'Modifier Objet' : 'Ajouter Object' }}
    </template>
    <b-form @submit.prevent="submitForm">
      <b-form-group label="Nom" label-for="name-input">
        <b-form-input id="name-input" v-model="objectData.name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Description" label-for="description-input">
        <b-form-textarea id="description-input" v-model="objectData.description" required></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">{{ isEditing ? 'Modifier' : 'Ajouter' }}</b-button>
    </b-form>
    <style>
      .modal-footer {
        display: none !important;
      }
    </style>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    modalId: {
      type: String,
      required: true
    },
    objectToEdit: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      objectData: {
        id: null,
        name: '',
        description: ''
      }
    };
  },
  computed: {
    isEditing() {
      return this.objectToEdit !== null;
    }
  },
  watch: {
    objectToEdit(newVal) {
      if (newVal) {
        this.objectData = { ...newVal };
      } else {
        this.resetForm();
      }
    }
  },
  methods: {
    ...mapActions('objects', ['addObject', 'updateObject']),
    async submitForm() {
      if (this.isEditing) {
        await this.updateObject(this.objectData);
      } else {
        await this.addObject(this.objectData);
      }
      this.$bvModal.hide(this.modalId);
      this.$emit('object-saved');
    },
    resetForm() {
      this.objectData = {
        id: null,
        name: '',
        description: ''
      };
    }
  }
};
</script>
