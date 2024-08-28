import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Product Listing Page</title>
        <meta name="description" content="A demo product listing page using Next.js and Fake Store API." />
      </Head>
      <header>
        <h1>Welcome to the Product Store</h1>
      </header>
      <main>
        <section className="product-list">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </article>
          ))}
        </section>
      </main>
      <style jsx>{`
        header {
          text-align: center;
          margin: 20px;
        }
        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .product-card {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        @media (max-width: 600px) {
          .product-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const initialProducts = await res.json();

  return {
    props: {
      initialProducts,
    },
  };
}
