<template>
      <div
        v-if="isVisible"
        class="modal-overlay"
        @click.self="close"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="modal-content" ref="modalContent">
          <header class="modal-header">
            <slot name="header">
              <h2 id="modal-title">Modal Title</h2>
            </slot>
            <button class="close-button" @click="close" aria-label="Close">&times;</button>
          </header>
          <section class="modal-body">
            <slot name="body"></slot>
          </section>
          <footer class="modal-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
  </template>
  

  <script setup>
  import {
    ref,
    defineProps,
    onMounted,
    computed,
    onBeforeUnmount,
  } from "vue";
  
  // Define props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  });
  
  // Define emits
  const emit = defineEmits(["update:modelValue"]);
  
  // Computed property for two-way binding with modelValue
  const isVisible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
  });
  
  // Function to close the modal
  const close = () => {
    isVisible.value = false;
  };
  
  // Reference to the modal content
  const modalContent = ref(null);
  
  
  // Handle Escape key to close modal
  const handleKeyDown = (event) => {
    if (event.key === "Escape" && isVisible.value) {
      close();
    }
  };
  
  // Watch for Escape key press
  onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });
  </script>
  
  

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  overflow: hidden;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-header,
.modal-footer {
  padding: 16px;
  background-color: #f1f1f1;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.close-button {
  background: none;
  border: 3px solid #ad2525;
  color: #ad2525;
  border-radius: 10px;
  font-size: 2rem;
  cursor: pointer;
}

.close-button:hover {
  color: #f3eeee;
  background-color: #ad2525;
}



@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .modal-content {
    width: 95%;
  }
}


</style>
