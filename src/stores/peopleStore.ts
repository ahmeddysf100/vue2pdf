// src/stores/people.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usePeopleStore = defineStore("people", () => {
  const people = ref([]);

  const getPeople = computed(() => people.value);

  function addPerson(person) {
    people.value.push(person);
  }

  function removePerson(id) {
    const index = people.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      people.value.splice(index, 1);
    }
  }

  function updatePerson(updatedPerson) {
    const index = people.value.findIndex((p) => p.id === updatedPerson.id);
    if (index !== -1) {
      people.value[index] = updatedPerson;
    }
  }

  return {
    people,
    getPeople,

    addPerson,
    removePerson,
    updatePerson,
  };
});
