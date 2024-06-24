import {useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      const {data} = await axios.get('/api/products');
      setProducts(data)
    }

    fetchProducts();
  }, []) //Array of dependencies where if you put something in [] and that value changes, this useEffect is going to run, however we only want it to run once, when the page loads

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => ( /*Map(iterate) through the products in the file products */
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}> {/*Screensize layout*/}
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen