import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { addProduct } from "../../actions/index";
import ProductList from '../ProductList';
class Catalogue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisibility: false,
      productName: '',
      productPrice: '', // In Rupees
      productId: 1,
      errors: {
        productName: {
          active: false,
          message: ''
        },
        productPrice: {
          active: false,
          message: ''
        },
      },
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ productName: event.target.value });
  }

  handlePriceChange(event) {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({ productPrice: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // Boolean Variables to check required field empty or not
    let isProductNameEmpty;
    let isPriceEmpty;


    const { productName, productPrice, productId } = this.state;

    if (productName === '') {
      isProductNameEmpty = true;
    }

    if (productPrice === '') {
      isPriceEmpty = true;
    }

    this.setState({
      errors: {
        productName: {
          active: isProductNameEmpty,
          message: 'Product name cannot be empty'
        },
        productPrice: {
          active: isPriceEmpty,
          message: 'Price cannot be empty'
        },
      }
    }, function () {

      // iterating through errors state to check whether there is error or not
      for (let err of Object.keys(this.state.errors)) {
        if (this.state.errors[err].active) {
          return
        }
      }

      this.setState({
        productId: this.state.productId + 1,
        modalVisibility: false
      }, function () {
        console.log(productName, productPrice, productId);

        // Resetting the input state values after successfully submit
        this.setState({
          productName: '',
          productPrice: ''
        });

        // Adding values to redux state
        this.props.addProduct({ productName, productPrice, productId });
      });
    });
  }

  openModal = () => {
    this.setState({ modalVisibility: true });
  };

  closeModal = () => {
    this.setState({ modalVisibility: false });
  };

  render() {
    const { modalVisibility, productName, productPrice } = this.state;

    return (
      <section className="catalogue-wrapper">
        <div className="text-right">
          <button className="btn-primary" onClick={this.openModal}>Add Info</button>
          <ProductList />
          <Modal
            isOpen={modalVisibility}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
          >
            <form onSubmit={this.handleSubmit}>
              <div className="modal-body">
                <div className="form-wrapper">
                  <div className="form-item">
                    <label>Product Name:</label>
                    <input name="productName" className={`${this.state.errors.productName.active ? 'input-error' : ''}`} type="text" placeholder="" value={productName} onChange={this.handleNameChange} />
                    {this.state.errors.productName.active &&
                      <span className="error-msg">{`${this.state.errors.productName.message}`}</span>
                    }
                  </div>
                  <div className="form-item">
                    <label>Product Price:</label>
                    <input name="productPrice" className={`${this.state.errors.productPrice.active ? 'input-error' : ''}`} type="text" placeholder="" value={productPrice} onChange={this.handlePriceChange} />
                    {this.state.errors.productPrice.active &&
                      <span className="error-msg">{this.state.errors.productPrice.message}</span>
                    }
                  </div>
                  <div className="form-item">
                    <button type="submit" className="btn-primary">Ok</button>
                    <button className="btn-secondary" onClick={this.closeModal}>Cancel</button>
                  </div>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </section>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addProduct: product => dispatch(addProduct(product))
  };
}


export default connect(
  null,
  mapDispatchToProps
)(Catalogue)
