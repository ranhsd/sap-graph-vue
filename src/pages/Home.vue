<template>
  <div class="h-full">
    <fd-container fluid centered class="overflow-y-auto w-full h-full">
      <fd-container centered class="h-full mt-4">
        <fd-table
          selection-mode="multiple"
          :headers="headers"
          :items="items"
          striped
        >
          <template #row="{ toggle, item }">
            <fd-table-row @click="toggle">
              <!-- <template #salesDocument>
            <fd-table-cell>
              <router-link
                :to="{
                  name: 'salesorder',
                  params: {
                      id: item.id
                  }
                }"
                >{{ item.id }}</router-link
              >
            </fd-table-cell>
          </template> -->
              <!-- <template #status>
            <fd-table-cell>
                <fd-status :statusIcon="statusIcons[item.status.name]">{{ item.status.name }}</fd-status>              
            </fd-table-cell>
          </template>           -->
              <template #customerId>
                <fd-table-cell>
                  <router-link
                    :to="{
                      name: 'orders',
                      params: {
                        id: item.id,
                      },
                    }"
                    >{{ item.displayId }}</router-link
                  >
                </fd-table-cell>
              </template>
              <template #organization>
                <fd-table-cell>
                  {{ item.organization.nameDetails.formattedOrgNameLine1 }}
                </fd-table-cell>
              </template>
            </fd-table-row>
          </template>
        </fd-table>
      </fd-container>
    </fd-container>
  </div>
</template>

<script>
import { getCustomers } from "@/api";
import ShellBar from "@/components/ShellBar";

export default {
  name: "Home",
  components: {
    ShellBar,
  },
  created() {
    this.refresh();
  },
  data() {
    return {
      headers: [
        {
          id: "customerId",
          label: "Customer ID",
        },
        {
          id: "organization",
          label: "Organization",
        },
        // {
        //   id: "status",
        //   label: "Status",
        // },
        // {
        //   id: "customerId",
        //   label: "Customer",
        // },
        // {
        //     id: "amount",
        //     label: "Net Amount"
        // }
      ],
      items: [],
      statusIcons: {
        Completed: "available",
        Open: "away",
        "Not Relevant": "offline",
      },
    };
  },
  methods: {
    async refresh() {
      const { value } = await getCustomers();
      this.items = value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
