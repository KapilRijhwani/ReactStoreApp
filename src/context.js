import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    cart: [],
    products: [],
    detailProduct,
    modalOpenFlag: false,
    modalProduct: detailProduct
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    let product = this.getItem(id);
    let index = tempProducts.indexOf(product);
    product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    this.setState(() => {
      return { product: tempProducts, cart: [...this.state.cart, product] };
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState({
      detailProduct: product
    });
  };

  openModal = id => {
    const product = this.getItem(id);
    console.log("open modal: " + id + ":::" + product);
    this.setState(() => {
      return { modalOpenFlag: true, modalProduct: product };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpenFlag: false };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
