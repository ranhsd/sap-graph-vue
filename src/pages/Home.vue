<template>
  <fd-container centered>
    <fd-table selection-mode="multiple" :headers="headers" :items="items">
      <template #row="{ toggle, item }">
        <fd-table-row @click="toggle">
          <template #salesDocument>
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
          </template>
          <template #status>
            <fd-table-cell>
                <fd-status :statusIcon="statusIcons[item.status.name]">{{ item.status.name }}</fd-status>              
            </fd-table-cell>
          </template>          
          <template #customerId>
            <fd-table-cell>
              {{ item.customerID }}
            </fd-table-cell>
          </template>
          <template #amount>
            <fd-table-cell>
              {{item.currency.code}} {{ item.netAmount }} 
            </fd-table-cell>
          </template>          
        </fd-table-row>
      </template>
    </fd-table>
  </fd-container>
</template>

<script>
import { getSalesOrders } from "@/api";

export default {
  name: "Home",
  created() {
    this.refresh();
  },
  data() {
    return {
      headers: [
        // "salesDocument",
        // "customerId",
        {
          id: "salesDocument",
          label: "Sales Document",
        },
        {
          id: "status",
          label: "Status",
        },        
        {
          id: "customerId",
          label: "Customer",
        },
        {
            id: "amount",
            label: "Net Amount"
        }
      ],
      items: [],
      statusIcons: {
          Completed: "available",
          Open: "away",
          "Not Relevant": "offline"

      }
    };
  },
  methods: {
    async refresh() {
      this.items = await getSalesOrders();
    },
  },
};
</script>

<style lang="scss" scoped></style>
