import React, { Component } from "react";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { closeModal, modalOpenFlag } = value;
          const { img, price, title } = value.modalProduct;
          if (!modalOpenFlag) {
            console.log("modal opeen flag: " + modalOpenFlag);
            return null;
          } else {
            console.log("modal opeen flag: " + modalOpenFlag);
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize "
                    >
                      <h5>Item added to cart.</h5>
                      <img src={img} alt="product" className="img-fluid" />
                      <h5>{title}</h5>
                      <h5 className="muted">$ {price}</h5>
                      <ButtonContainer onClick={() => closeModal()}>
                        <Link to="/">Store</Link>
                      </ButtonContainer>
                      <ButtonContainer cart onClick={() => closeModal()}>
                        <Link to="/cart">Go to Cart</Link>
                      </ButtonContainer>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
