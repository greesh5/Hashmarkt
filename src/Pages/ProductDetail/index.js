import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartIcon, HeartIcon, StarIcon } from "@heroicons/react/solid";
import Spinner from "../../Components/Spinner";
import { useProduct } from "../../Context/ProductContext";
import { useCart } from "../../Context/CartContext";
import { useFavorite } from "../../Context/FavoriteContext";
import styles from "./styles.module.css";

const ProductDetail = () => {
  const {addToCart, items,removeFromCart} = useCart()
  const {addToFavorite, favoriteItems,removeFromFavorite} = useFavorite()
  const { product,loading, setProductID } = useProduct()
  
  const {product_id} = useParams()
  setProductID(product_id)
  useEffect(() => {
    setProductID(product_id)
  }, [product_id])
  
  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToFavorite = () => {
    addToFavorite(product);
  };
  const handleremoveFromCart=()=>{
    removeFromCart(product);
  };
  const handleremoveFromFavorite=()=>{
    removeFromFavorite(product);
  }
  
    const findCartItem = items.find(item => item.id === product.id);
    const findFavoriteItem=favoriteItems.find(item=>item.id === product.id);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="float-left">
          <img className={styles.image} src={product.image} alt={product.title}/>
          </div>
          <div className="flex flex-wrap my-5">
          <div style={{display:'flex',flexDirection:'column',margin:'30px'}}>
          <h2 className={styles.brand}>BRAND</h2>
          <h1 style={{ fontSize: '24px',fontWeight:"bold"}}>{product.title}</h1>
          <div className={styles.rating} style={{color:'yellow'}}>
            <StarIcon className={styles.StarIcon} width="15"/>
            <StarIcon className={styles.StarIcon} width="15"/>
            <StarIcon className={styles.StarIcon} width="15"/>
            <StarIcon className={styles.StarIcon} width="15"/>
            <StarIcon className={styles.emptyStarIcon} />
          </div>
          <p className={styles.productDetailTex}>{product.description}</p>
          <hr className="flex B-3"/>
          <div style={{display:'flex',justifyContent:'space-between',margin:'15px'}}>
          <p style={{display:'flex',fontSize:'30px',color:'yellow'}}>${product.price}</p>
          <div className="flex">
            {findCartItem ? (
              <button onClick={handleremoveFromCart} className={styles.removeButton}>Remove from cart</button>
            ) : (
              // <div className={styles.addToCart}>
                <button onClick={handleAddToCart} className={styles.addToCartButton} >
                  {/* <ShoppingCartIcon className={styles.ShoppingCartIcon} /> */}
                  Add to Cart
                </button>
              // </div>
            )}
            <div>
              {findFavoriteItem ? (
                <button onClick={handleremoveFromFavorite} className={styles.removeFavButton}>
                  <HeartIcon />
                  </button>
              ) : (
                <button onClick={handleAddToFavorite} className={styles.favButton}>
                  <HeartIcon />
                </button>
              )}
            </div>
          </div>
          </div>
          </div>
          </div>
        </>
      )}
    </>
  );
              }  

export default ProductDetail;
