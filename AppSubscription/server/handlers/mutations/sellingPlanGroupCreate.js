import "isomorphic-fetch";
import { gql } from "apollo-boost";

export function GROUP_CREATE() {
  return gql`
  mutation {
    appSellingPlanGroupCreate(
      input: {
        name: "Subscribe and save"
        merchantCode: "subscribe-and-save"
        options: ["Delivery every"]
        position: 1
        sellingPlansToCreate: [
          {
            name: "Delivered every week"
            options: "1 Week(s)"
            position: 1
            billingPolicy: { recurring: { interval: WEEK, intervalCount: 1 } }
            deliveryPolicy: { recurring: { interval: WEEK, intervalCount: 1 } }
            pricingPolicies: [
              {
                fixed: {
                  adjustmentType: PERCENTAGE
                  adjustmentValue: { percentage: 15.0 }
                }
              }
            ]
          }
          {
            name: "Delivered every two weeks"
            options: "2 Week(s)"
            position: 2
            billingPolicy: { recurring: { interval: WEEK, intervalCount: 2 } }
            deliveryPolicy: { recurring: { interval: WEEK, intervalCount: 2 } }
            pricingPolicies: [
              {
                fixed: {
                  adjustmentType: PERCENTAGE
                  adjustmentValue: { percentage: 10.0 }
                }
              }
            ]
          }
          {
            name: "Delivered every three weeks"
            options: "3 Week(s)"
            position: 3
            billingPolicy: { recurring: { interval: WEEK, intervalCount: 3 } }
            deliveryPolicy: { recurring: { interval: WEEK, intervalCount: 3 } }
            pricingPolicies: [
              {
                fixed: {
                  adjustmentType: PERCENTAGE
                  adjustmentValue: { percentage: 5.0 }
                }
              }
            ]
          }
        ]
      }
      resources: { productIds: [], productVariantIds: [] }
    ) {
      sellingPlanGroup {
        id
      }
      userErrors {
        field
        message
      }
    } 
  `;
}

export const getGroupCreateUrl = async (ctx) => {
  const { client } = ctx;
  const confirmationUrl = await client
    .mutate({
      mutation: GROUP_CREATE(process.env.HOST),
    })
    .then((response) => response.data.appSellingPlanGroupCreate.confirmationUrl);
  return ctx.redirect(confirmationUrl);
};