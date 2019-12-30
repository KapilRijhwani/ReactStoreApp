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
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
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
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(product => {
      subTotal += product.total;
    });
    let tempTax = subTotal * 0.1;
    let tax = parseFloat(tempTax.toFixed(2));
    let total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
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
    this.setState(() => {
      return { modalOpenFlag: true, modalProduct: product };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpenFlag: false };
    });
  };

  incrementItem = id => {
    let tempCart = [...this.state.cart];
    let selectedProduct = tempCart.find(product => product.id === id);
    let index = tempCart.indexOf(selectedProduct);
    let product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrementItem = id => {
    let tempCart = [...this.state.cart];
    let selectedProduct = tempCart.find(product => product.id === id);
    let index = tempCart.indexOf(selectedProduct);
    let product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(product => product.id !== id);

    let removedProduct = this.getItem(id);
    let indexRemovedProd = tempProducts.indexOf(removedProduct);
    removedProduct = tempProducts[indexRemovedProd];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(
      () => {
        return { cart: [...tempCart], products: [...tempProducts] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          incrementItem: this.incrementItem,
          decrementItem: this.decrementItem,
          clearCart: this.clearCart,
          removeItem: this.removeItem
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
