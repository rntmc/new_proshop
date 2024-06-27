import {Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useGetProductsQuery} from '../slices/productsApiSlices'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });
 
  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message}</Message>;
 
  return (
    <>
      {!keyword ? (
        <ProductCarousel products={data.products} />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go back
        </Link>
      )}
      <>
        <h1>Latest products</h1>
        <Row>
          {data.products.map((product) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product}></Product>
              </Col>
            );
          })}
        </Row>
        <Paginate
          pages={data.pages}
          page={data.page}
          keyword={keyword ? keyword : ""}
        />
      </>
    </>
  );
};

export default HomeScreen