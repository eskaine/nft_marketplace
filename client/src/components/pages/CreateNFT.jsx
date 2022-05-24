import { ethers } from 'ethers';
import React, { useContext, useState } from 'react';
import { EthersContext } from '../utils/EthersProvider';
import NFTDisplay from './shared/NFTDisplay';
import "../styles/base.css";

function CreateNFT() {
	const { getNFTList } = useContext(EthersContext);
  return (
    <main className="container mx-auto mt-10">
    <>
      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
			  {getNFTList().map((nft) => (
				<NFTDisplay
					label={nft.label}
					imageUrl={nft.imageUrl}
					owner={nft.owner}
					price={nft.price}
				/>
				))}
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input type="file" className="upload__input" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Price</label>
                    <input
                      type="number"
                      placeholder="Enter price for one item (ETH)"
                    />
                  </div>

                  <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Starting Date</label>
                      <input type="date" />
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Expiration Date</label>
                      <input type="date" />
                    </div>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="Enter title" />
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
    </main>
  );
}

export default CreateNFT;
