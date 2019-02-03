import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductList extends Component {

  renderProducts() {

    return this.props.products.map((product, productID) => {
      console.log(product);
      return (
        <tr key={productID}>
          <td className="">{product.productId}</td>
          <td className="">{product.productName}</td>
          <td className="">{product.productPrice}</td>
        </tr>
      )
    })
  }

  render() {

    if (this.props.products.length <= 0) {
      return (
        <div></div>
      )
    }

    return (

      <section className="product-list-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.renderProducts()}
          </tbody>
        </table>

      </section>
    )
  }
}

const mapStateToProps = (state, props) => ({
  products: state.products
})

export default connect(
  mapStateToProps,
  null
)(ProductList)
