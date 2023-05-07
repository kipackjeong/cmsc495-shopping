import ProductsListView from "@/content/main/ProductsListView";
import MainLayout from "@/layouts/MainLayout";
import { connectMongoWrapper } from "@/lib/connect-mongo";
import ProductModel from "@/lib/models/product.model";
import { handleSessionSsrWrapper } from "@/lib/session";
import { Product } from "@/lib/types";
import React from "react";

type ProductsPageProps = { products: Product[] };
const ProductsPage = ({ products }: ProductsPageProps) => {
  console.log("products: ", products);
  return (
    <MainLayout>
      <ProductsListView products={products} />
    </MainLayout>
  );
};

export default ProductsPage;

export const getServerSideProps = handleSessionSsrWrapper(
  connectMongoWrapper(async (context: any) => {
    const { query } = context;
    const { q } = query;

    try {
      const keywords = q.trim().toLowerCase().split(" ");
      const regExpKeywords = keywords.map((word: any) => new RegExp(word, "i"));

      //MARK[epic=search] search query
      const data = await ProductModel.find({
        $or: [
          { title: { $in: regExpKeywords } },
          { category: { $in: regExpKeywords } },
        ],
      });

      const cleanedData = data.map(
        ({ id, title, description, category, image, price, rating }) => ({
          id,
          title,
          description,
          category,
          image,
          price,
          rating: rating.toObject(),
        })
      );

      return {
        props: {
          products: cleanedData,
        },
      };
    } catch (error) {
      console.log(error);
    }

    return {
      props: {},
    };
  })
);
