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

    <button class="btn btn-save" @click="savePerson">{{ isEdit ? "Save" : "Add" }}</button>
    <button v-if="form.name" class="btn btn-cancel" @click="resetForm">cancel</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { usePeopleStore } from "../stores/peopleStore";

const store = usePeopleStore();
const isEdit = ref(false);
// Props for editing
const props = defineProps({
  isEditing: Boolean,
  editPerson: Object, // The person object to be edited
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

  border-radius: 15px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  background-color: #f5f5f5;
  font-size: 16px;
  font-family: sans-serif;
  color: #333;
}
/* From Uiverse.io by kamehame-ha */
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
  margin: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.3em;
  transition: background-color 0.3s ease;
}

.btn-save {
  background-color: #4CAF50;
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
</style>
