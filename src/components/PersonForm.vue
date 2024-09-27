/**
 * The `PersonForm` component is responsible for rendering a form to create or edit a person.
 * It uses the `usePeopleStore` Pinia store to manage the person data.
 * The form includes fields for the person's name, age, and address.
 * The component supports both creating a new person and editing an existing one.
 * When the form is submitted, the component will either add a new person or update an existing one.
 * The component also provides a "cancel" button to reset the form.
 */
<template>
  <div class="person-form">
    <h3>{{ isEdit ? "Edit Person" : "Add New Person" }}</h3>
    <div class="coolinput">
      <label for="input" class="text">Name:</label>
      <input
        v-model="form.name"
        placeholder="Name"
        name="input"
        class="input"
      />
    </div>

    <div class="coolinput">
      <label for="input" class="text">Age:</label>
      <input
        v-model="form.age"
        placeholder="Age"
        type="number"
        name="input"
        class="input"
      />
    </div>
    <div class="coolinput">
      <label for="input" class="text">Address:</label>
      <input
        v-model="form.address"
        placeholder="Address"
        name="input"
        class="input"
      />
    </div>

    <button :disabled="disabled" class="btn btn-save" @click="savePerson">
      {{ isEdit ? "Save" : "Add" }}
    </button>
    <button v-if="form.name" class="btn btn-cancel" @click="resetForm">
      cancel
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { usePeopleStore } from "../stores/peopleStore";

const store = usePeopleStore();
const isEdit = ref(false);
const disabled = ref(true);

// Props for editing
const props = defineProps({
  isEditing: Boolean,
  editPerson: Object, 
});

const form = ref({
  id: "",
  name: "",
  address: "",
  age: 0,
});

const resetForm = () => {
  form.value = { id: "", name: "", address: "", age: 0 };
  isEdit.value = false;
};

watch(
  () => form.value,
  (newForm) => {
    // Disable button if any form fields are empty
    if (newForm.name && newForm.age && newForm.address) {
      disabled.value = false;
    } else {
      disabled.value = true;
    }
  },
  { deep: true }
);

// Watch for changes in the editPerson prop to pre-fill the form
watch(
  () => props.editPerson,
  (newPerson) => {
    if (newPerson) {
      form.value = { ...newPerson }; // Pre-fill form with the selected person data
      isEdit.value = true; // Enter editing mode
    } else {
      resetForm(); // If no person to edit, reset the form
    }
  },
  { immediate: true }
);

const savePerson = () => {
  if (isEdit.value) {
    store.updatePerson(form.value); // Update existing person
    isEdit.value = false; // Exit editing mode
  } else {
    const id = Date.now().toString(); // Generate a unique ID for a new person
    store.addPerson({ ...form.value, id }); // Add new person
  }
  resetForm();
};
</script>


<style scoped>
.person-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  gap: 20px;
  margin-bottom: 1rem;

  border-radius: 15px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  background-color: #f5f5f5;
  font-size: 16px;
  font-family: sans-serif;
  color: #333;
}



.coolinput {
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: static;
  width: 300px;
}

.coolinput label.text {
  font-size: 0.75rem;
  color: #818cf8;
  font-weight: 700;
  position: relative;
  top: 0.5rem;
  margin: 0 0 0 7px;
  padding: 0 3px;
  background: #e8e8e8;
  width: fit-content;
}

.coolinput input.input {
  padding: 11px 10px;
  font-size: 0.75rem;
  border: 2px #818cf8 solid;
  border-radius: 5px;
  background: #e8e8e8;
}

.coolinput input[type="text"].input:focus {
  outline: none;
}

.btn {
  margin: 15px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.3em;
  transition: background-color 0.3s ease;
}

.btn-save {
  background-color: #4caf50;
  color: white;
}
.btn-save:hover {
  background-color: #45a049;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-cancel:hover {
  background-color: #da190b;
}


@media (max-width: 600px) {
  .person-form {
    width: 300px;
  }
  .btn {
    width: 80px;
    font-size: 1em;
  }
  .coolinput {
    width: 200px;
  }
}
</style>
