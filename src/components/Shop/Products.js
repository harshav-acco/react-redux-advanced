import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "Book 1",
    price: 10,
    description: "This is my first book"
  },
  {
    id: "p2",
    name: "Book 2",
    price: 100,
    description: "This is my second book"
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map(product => (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.name}
              price={product.price}
              description={product.description}
            />
          ))
        }
      </ul>
    </section>
  );
};

export default Products;
