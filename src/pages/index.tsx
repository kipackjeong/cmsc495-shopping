import { Inter } from "next/font/google";
import ProductsListView from "@/content/main/ProductsListView";
import MainLayout from "@/layouts/MainLayout";
import ProductModel from "@/lib/models/product.model";
import connectMongo, { connectMongoWrapper } from "@/lib/connect-mongo";
import { withIronSessionSsr } from "iron-session/next";
import { handleSessionSsrWrapper, sessionOptions } from "@/lib/session";
import { toJSON } from "@/utils/helpers";
import { GetServerSidePropsContext } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }: { products: any[] }) {
  return (
    <MainLayout>
      <ProductsListView products={products} />
    </MainLayout>
  );
}

export const getServerSideProps = handleSessionSsrWrapper(
  connectMongoWrapper(async function ({
    req,
    res,
  }: GetServerSidePropsContext): Promise<any> {
    try {
      const products = await ProductModel.find();
      const productsJSON = toJSON(products);

      // Pick only the necessary properties (e.g., _id, name, etc)
      const cleanProducts = productsJSON.map(
        ({ id, title, description, category, image, price, rating }) => ({
          id,
          title,
          description,
          category,
          image,
          price,
          rating,
        })
      );

      return {
        props: {
          products: cleanProducts,
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
