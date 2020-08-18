<template>
  <fd-container centered>
    <fd-panel :title="salesOrderTitle">
      <fd-tabs v-model="selectedTab">
        <fd-tab-item label="Items" name="items">
          <fd-table
            v-if="salesOrder && salesOrder.items"
            :headers="orderItemsHeaders"
            :items="salesOrder.items"
          >
            <template #row="{ toggle, item }">
              <fd-table-row @click="toggle">
                <template #itemId>
                  <fd-table-cell>
                    <router-link
                      :to="{
                        name: 'salesorder',
                        params: {
                          id: item.id,
                        },
                      }"
                      >{{ item.id }}</router-link
                    >
                  </fd-table-cell>
                </template>
                <template #productId>
                  <fd-table-cell>
                    {{ item.productID }}
                  </fd-table-cell>
                </template>
                <template #productDesc>
                  <fd-table-cell>
                    {{ item.productDescription }}
                  </fd-table-cell>
                </template>
                <template #quantity>
                  <fd-table-cell>
                    {{ item.quantity }}
                  </fd-table-cell>
                </template>
                <template #amount>
                  <fd-table-cell>
                    {{ salesOrder.currency.code }} {{ item.netAmount }} 
                  </fd-table-cell>
                </template>
              </fd-table-row>
            </template>
          </fd-table>
        </fd-tab-item>
        <fd-tab-item label="Customer" name="customer"> </fd-tab-item>
      </fd-tabs>
    </fd-panel>
  </fd-container>
</template>

<script>
import { getSalesOrder } from "@/api";

export default {
  name: "SalesOrderPage",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    this.refresh();
  },
  data() {
    return {
      selectedTab: "items",
      salesOrder: null,
      orderItemsHeaders: [
        {
          id: "itemId",
          label: "Item ID",
        },
        {
          id: "productId",
          label: "Product ID",
        },
        {
          id: "productDesc",
          label: "Product Description",
        },
        {
          id: "quantity",
          label: "Quantity",
        },
        {
          id: "amount",
          label: "Net Amount",
        },
      ],
    };
  },
  computed: {
    salesOrderTitle() {
      return `Sales Document ${this.id}`;
    },
  },
  methods: {
    async refresh() {
      this.salesOrder = await getSalesOrder(this.id);
    },
  },
};
</script>
