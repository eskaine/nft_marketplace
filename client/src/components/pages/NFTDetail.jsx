import "../styles/base.css";
import { Link  } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { EthersContext } from '../utils/EthersProvider';
import NFTDisplay from './shared/NFTDisplay';

function NFTDetail() {
	const { getNFTList } = useContext(EthersContext);
  return (
	<>
		<div className="flex justify-center flex-wrap">
	{getNFTList().map((nft) => (
	  <NFTDisplay
		label={nft.label}
		imageUrl={nft.imageUrl}
		owner={nft.owner}
		price={nft.price}
	  />
	))}
  </div>
	<section>
	  <Container>
		<Row>
		  <Col lg="6" md="6" sm="6">
			<img
			  src={nft.imageUrl}
			  alt=""
			  className="w-100 single__nft-img"
			/>
		  </Col>

		  <Col lg="6" md="6" sm="6">
			<div className="single__nft__content">
			  <h2>{nft.label}</h2>

			  <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
				<div className=" d-flex align-items-center gap-4 single__nft-seen">
				  <span>
					<i class="ri-eye-line"></i> 234
				  </span>
				  <span>
					<i class="ri-heart-line"></i> 123
				  </span>
				</div>

				<div className=" d-flex align-items-center gap-2 single__nft-more">
				  <span>
					<i class="ri-send-plane-line"></i>
				  </span>
				  <span>
					<i class="ri-more-2-line"></i>
				  </span>
				</div>
			  </div>

			  <div className="nft__creator d-flex gap-3 align-items-center">
				<div className="creator__img">
				  <img src={nft.imageUrl} alt="" className="w-100" />
				</div>

				<div className="creator__detail">
				  <p>Created By</p>
				  <h6>{nft.owner}</h6>
				</div>
			  </div>
			  <button className="singleNft-btn d-flex align-items-center gap-2 w-100">
				<i class="ri-shopping-bag-line"></i>
				<Link to="/wallet">Buy Now</Link>
			  </button>
			</div>
		  </Col>
		</Row>
	  </Container>
	</section>

  </>
  );
}

export default NFTDetail;
