// "use client";
// import { ShopifyCollection } from "@/types/types";
// import { useEffect, useState } from "react";

// export const useFetchCollections = () => {
//   const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
//   const storefrontToken =
//     process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

//   const [collections, setCollections] = useState<ShopifyCollection[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCollections = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const query = `
//         {
//           collections(first: 50) {
//             edges {
//               node {
//                 id
//                 handle
//                 title
//                 image {
//                   src
//                   altText
//                 }
//               }
//             }
//           }
//         }
//       `;

//       const res = await fetch(
//         `https://${shopDomain}/api/2025-10/graphql.json`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-Shopify-Storefront-Access-Token": storefrontToken,
//           },
//           body: JSON.stringify({ query }),
//         }
//       );

//       const json = await res.json();
//       setCollections(json.data.collections.edges.map((edge: any) => edge.node));
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCollections();
//   }, []);

//   return { collections, loading, error };
// };
