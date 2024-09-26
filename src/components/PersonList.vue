<script setup>
import { usePeopleStore } from "../stores/peopleStore";
import PersonForm from "../components/PersonForm.vue";
import Card2Pdf from "../components/Card2Pdf.vue";

import { ref } from "vue";

const store = usePeopleStore();
const people = store.getPeople;
const isEditing = ref(false);
const editPerson = ref(null);
const card = ref(false);
const personCard = ref(null);

// Edit an existing person
const edit = (person) => {
  isEditing.value = true;
  editPerson.value = { ...person }; // Use a shallow copy to prevent two-way data binding issues
};

// Delete a person (if needed)
const deletePerson = (personId) => {
  store.removePerson(personId);
};

const showCard = (person) => {
  card.value = true;
  personCard.value = { ...person }; 
  console.log(personCard.value);
};

const closeCard = (val) => {
    card.value = val;
    console.log('card',card.value);
}
</script>

<template>
  <PersonForm :isEditing="isEditing" :editPerson="editPerson" />

  <ul class="people-list">
    <li v-for="person in people" :key="person.id" class="person-item">
      <div class="person-details">
        <!-- <h3 class="person-name">{{ person.name }}</h3> -->
        <div class="person-info">
          <p>
            ID: <span> {{ person.id }}</span>
          </p>
          <p>
            Name: <span> {{ person.name }}</span>
          </p>
          <p>
            Address: <span> {{ person.address }}</span>
          </p>
          <p>
            Age: <span> {{ person.age }}</span>
          </p>
        </div>
      </div>
      <div class="person-actions">
        <button class="btn btn-show-card" @click="showCard(person)">
          Show Card
        </button>
        <button class="btn btn-edit" @click="edit(person)">Edit</button>
        <button class="btn btn-delete" @click="deletePerson(person.id)">Cancel</button>
      </div>
    </li>
  </ul>
  <Card2Pdf v-if="card"  @update:showCard="closeCard" :person="personCard"/>
</template>

<style scoped>
.people-list {
  list-style: none;
  padding: 0;
  margin: 5px;
  width: 100%;

  /* Allow the .app container to grow */
  max-height: 200px; /* Optional: limit the height to viewport */
  overflow-y: auto; /* Enable vertical scrolling within .app */
}

.person-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  margin-bottom: 12px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.person-details {
  max-width: 100%;
}

span {
  color: #1c1a1a;
  font-weight: 500;
}

.person-name {
  margin: 0 0 8px 0;
  font-size: 1.2em;
  color: #333;
}

.person-info {
  display: flex;
  gap: 30px;
  font-size: 1em;
  font-weight: bold;
  color: #171616;
}

.person-actions .btn {
  margin-left: 8px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #4caf50;
  color: white;
}

.btn-edit:hover {
  background-color: #45a049;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #da190b;
}

.btn-show-card {
  background-color: #4ca3af;
  color: white;
}

.btn-show-card:hover {
  background-color: #458ca0;
}
</style>
