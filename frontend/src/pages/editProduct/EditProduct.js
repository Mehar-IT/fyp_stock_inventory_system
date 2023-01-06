import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  getProduct,
  getAllProducts,
  // selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);



  const [product, setProduct] = useState("");
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {

    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.avatar
    );
    setAvatar(
      productEdit && productEdit.avatar
    )
    setDescription(
      productEdit && productEdit.description
    );

  }, [productEdit]);

  const handleInputChange = (e) => {


    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("name", product?.name);

    // formData.append("category", product?.category);
    // formData.append("quantity", product?.quantity);
    // formData.append("price", product?.price);
    // formData.append("description", description);

    // if (avatar) {
    //   formData.append("image", avatar);
    // }
    const formData = {
      "name": product?.name,
      "category": product?.category,
      "price": product?.price,
      "quantity": product?.quantit,
      "description": description,
      "image": avatar
    }


    dispatch(updateProduct({ id, formData }));
    dispatch(getAllProducts());
    navigate("/dashboard");
  };


  return (
    <div>
      {!product ? <Loader /> :
        <>
          <h3 className="--mt">Edit Product</h3>
          <ProductForm
            product={product}
            productImage={productImage}
            imagePreview={imagePreview}
            description={description}
            setDescription={setDescription}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            saveProduct={saveProduct}
            avatar={avatar}
            setAvatar={setAvatar}
          />
        </>}
    </div>
  );
};

export default EditProduct;
