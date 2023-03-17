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
          <img className={styles.image} src={product.image} alt={product.title} />
          <div className="flex flex-wrap my-5">
          <div className="flex flex-col">
          <h2 className={styles.brand}>BRAND</h2>
          <div className={styles.rating}>
            <StarIcon className={styles.StarIcon} width="15"/>
            <StarIcon className={styles.StarIcon} width="15"/>
            <StarIcon className={styles.StarIcon} width="15"/>
            <StarIcon className={styles.StarIcon} width="15"/>
            <StarIcon className={styles.emptyStarIcon} />
          </div>
          <p className={styles.productDetailTex}>{product.description}</p>
          <hr className="flex B-3"/>
        <div className="flex w-50">
          <p className="flex color-yellow font-50">{product.price}</p>
          </div>
          <div>
            {findCartItem ? (
              <button onClick={handleremoveFromCart} className={styles.removeButton}>Remove from cart</button>
            ) : (
              // <div className={styles.addToCart}>
                <button onClick={handleAddToCart} className={styles.addToCartButton} width={"20 rem"}>
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
        </>
      )}
    </>
  );
              }  

export default ProductDetail;
