<template>
  <fd-container centered class="h-full">
    <div class="h-full flex items-center" v-if="loading">
      <fd-spinner />
    </div>

    <fd-panel
      v-if="customer"
      :title="salesOrderTitle"
      class="mt-4 overflow-y-auto h-full"
    >
      <fd-tabs v-model="selectedTab">
        <fd-tab-item label="Orders" name="orders">
          <fd-table :headers="orderItemsHeaders" :items="orders">
            <template #row="{ toggle, item }">
              <fd-table-row @click="toggle">
                <template #orderId>
                  <fd-table-cell>
                    <router-link
                      :to="{
                        name: 'order',
                        params: {
                          id: item.id,
                        },
                      }"
                      >{{ item.displayId }}</router-link
                    >
                  </fd-table-cell>
                </template>
                <template #type>
                  <fd-table-cell>
                    {{ item.type.name }}
                  </fd-table-cell>
                </template>
                <template #processingStatus>
                  <fd-table-cell>
                    <fd-status
                      :statusIcon="statusIcons[item.processingStatus.code]"
                      >{{ item.processingStatus.name }}</fd-status
                    >
                  </fd-table-cell>
                </template>
                <template #amount>
                  <fd-table-cell>
                    {{ `${item.currency.code} ${item.netAmount}` }}
                  </fd-table-cell>
                </template>

                <template #pricedExt>
                  <fd-table-cell>
                    <fd-checkbox disabled :value="item.isExternallyPriced"></fd-checkbox>
                  </fd-table-cell>
                </template>
                <template #fulDate>
                  <fd-table-cell>
                    {{ formatDate(item.requestedFulfillmentDate) }}
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
import { getSalesOrder, getCustomer, getCustomerOrders } from "@/api";
import moment from "moment";

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
      selectedTab: "orders",
      orders: [],
      loading: false,
      nextPageLink: undefined,
      statusIcons: {
        C: "available",
        B: "away",
        A: "offline",
      },
      customer: null,
      orderItemsHeaders: [
        {
          id: "orderId",
          label: "Order Number",
        },
        {
          id: "type",
          label: "Order Type",
        },
        {
          id: "processingStatus",
          label: "Processing Status",
        },
        {
          id: "amount",
          label: "Net Amount",
        },
        {
          id: "pricedExt",
          label: "Externally Priced (Y/N)",
        },   
        {
          id: "fulDate",
          label: "Fulfillment Date",
        },               
      ],
    };
  },
  computed: {
    salesOrderTitle() {
      return `Customer ${this.customer.displayId}`;
    },
  },
  methods: {
    async refresh() {
      try {
        this.loading = true;
        this.customer = await getCustomer(this.id);
        const { items, next } = await getCustomerOrders(
          this.customer.displayId
        );
        this.orders = items;
        this.nextPageLink = next;
        // load customer orders
      } finally {
        this.loading = false;
      }
    },
    formatDate(date){
      return moment(date).format("MMM Do YY");
    }
  },
};
</script>
