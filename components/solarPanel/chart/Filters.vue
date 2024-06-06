<script setup lang="ts">

import type { Filters } from "~/models/chart/filters";
import moment from "moment";

const { filters } = defineProps<{
  filters: Filters;
}>();

const options = ref([
  { value: "QUARTER_OF_AN_HOUR", text: "15 min" },
  { value: "HOUR", text: "heure" },
  { value: "DAY", text: "jour" },
  { value: "WEEK", text: "semaine" },
  { value: "MONTH", text: "mois" },
  { value: "YEAR", text: "année" },
]);

const startDateISO = computed({
  get: () => moment(filters.startDate).format("YYYY-MM-DDTHH:mm:ss"),
  set: (value) => {
    filters.startDate = new Date(value);
  },
});

const endDateISO = computed({
  get: () => moment(filters.endDate).format("YYYY-MM-DDTHH:mm:ss"),
  set: (value) => {
    filters.endDate = new Date(value);
  },
});

function reset() {
  filters.startDate = moment().subtract(7, "days").toDate();
  filters.endDate = new Date();
  filters.timeUnit = "HOUR";
  updateFilters();
}

const undoStack: Filters[] = [];
let redoStack: Filters[] = [];
undoStack.push({ ...filters });
function updateFilters() {
  // Only add to stack if the latest state is different from the current state
  if (undoStack.length === 0 || JSON.stringify(undoStack[undoStack.length - 1]) !== JSON.stringify(filters)) {
    undoStack.push({ ...filters });
    redoStack = []; // Clear the redo stack on new changes
  }
}

function undo() {
  if (undoStack.length > 1) { // Ensure there's a previous state to go back to
    redoStack.push(undoStack.pop()!); // Move the current state to the redo stack
    const lastState = undoStack[undoStack.length - 1];
    filters.startDate = lastState.startDate;
    filters.endDate = lastState.endDate;
    filters.timeUnit = lastState.timeUnit;
  }
}

function redo() {
  if (redoStack.length > 0) {
    undoStack.push({ ...filters }); // Save current state for undo
    const nextState = redoStack.pop()!;
    filters.startDate = nextState.startDate;
    filters.endDate = nextState.endDate;
    filters.timeUnit = nextState.timeUnit;
  }
}

watch(() => filters, () => {
  updateFilters();
}, { deep: true });

onMounted(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    event.stopImmediatePropagation();
    if ((event.key === 'z' || event.key === 'Z') && (event.ctrlKey || event.metaKey)) {
      event.shiftKey ? redo() : undo();
      event.preventDefault();
    }
  };
  window.addEventListener('keydown', handleKeyDown);

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
});
</script>

<template>
  <UPopover class="popover-content" :popper="{placement: 'bottom-end'}">
    <UButton class="filter-button" size="xl">
      <UIcon name="i-heroicons-funnel" class="filter-icon" />
      <span class="display-on-hover">Filtres</span>
    </UButton>

    <template #panel>
      <div class="popover-content container bg-white dark:bg-black">
        <div class="relative">
          <UTooltip text="Réinitalise les filtres"  :popper="{ placement: 'top' }" >
            <button class="btn-float reset" @click="reset" aria-label="Reset filters" >
              <UIcon name="i-heroicons-x-mark" />
            </button>
          </UTooltip>

          <UTooltip text="Annule les dernières modifications" :shortcuts="['Ctrl', 'Z']"  :popper="{ placement: 'top' }" >
            <button class="btn-float previous" @click="undo" aria-label="Previous filters">
              <UIcon name="i-heroicons-arrow-uturn-left" />
            </button>
          </UTooltip>

          <UTooltip text="Refait les dernières modifications" :shortcuts="['Ctrl', 'Shift', 'Z']"  :popper="{ placement: 'top' }" >
            <button class="btn-float next" @click="redo" aria-label="Next filters">
              <UIcon name="i-heroicons-arrow-uturn-right" />
            </button>
          </UTooltip>

          <h1 class="text-xl font-bold text-center mb-2">Filtres</h1>
        </div>
        <div class="filters-popover-wrap">
          <h2 class="mb-1">Plage de temps</h2>
          <div class="custom-select">
            <div class="custom-option"
                 v-for="(option, index) in options"
                 :key="index"
                 :class="{ 'selected-option': filters.timeUnit === option.value }"
                 @click="filters.timeUnit = option.value">
              {{ option.text }}
            </div>
          </div>

          <div class="mb-1 mt-2 flex items-center">
            <UIcon name="i-heroicons-calendar" />
            <label for="startDate" class="ml-1">Date de début</label>
          </div>
          <input type="datetime-local" v-model="startDateISO" id="startDate">

          <div class="mb-1 mt-2 flex items-center">
            <UIcon name="i-heroicons-calendar" />
            <label for="endDate" class="ml-1">Date de fin</label>
          </div>
          <input type="datetime-local" v-model="endDateISO" id="endDate">
        </div>
      </div>
    </template>
  </UPopover>
</template>

<style scoped>
@import url("~/assets/css/solarPanel/filters.css");
</style>