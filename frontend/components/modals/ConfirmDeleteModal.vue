<template>
  <b-modal ref="deleteModal" @ok="$emit('confirm-delete')">
    <template #modal-title>
      Confirmation de suppression
    </template>
    Êtes-vous sûr de vouloir supprimer cet objet nommé "{{ itemName }}" ?
  </b-modal>
</template>

<script>
export default {
  props: {
    itemName: {
      type: String,
      required: true
    }
  },
  methods: {
    show() {
      this.$refs.deleteModal.show();
    }
  }
};
</script>
