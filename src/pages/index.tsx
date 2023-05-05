import { Inter } from "next/font/google";
import ProductsListView from "@/content/main/ProductsListView";
import MainLayout from "@/layouts/MainLayout";
import ProductModel from "@/lib/models/product.model";
import connectMongo from "@/lib/connectMongo";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }: { products: any[] }) {
  return (
    <MainLayout>
      <ProductsListView products={products} />
    </MainLayout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}): Promise<any> {
  try {
    console.log("req.session.user: ", req.session.user);

    const { user } = req.session;

    if (!user) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    await connectMongo();
    const products = await ProductModel.find();
    const productsJSON = products.map((product) => product.toObject());

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
},
sessionOptions);
