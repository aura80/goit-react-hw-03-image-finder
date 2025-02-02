import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import axios from 'axios';
import Button from './Button';
import Loader from './Loader';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showModal: false,
    largeImageUrl: '',
    alt: '',
    isLoading: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    const API_KEY = '47192464-fcc47f6df3479fe275626acec';
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    try {
      const response = await axios.get(URL);
      this.setState(
        prevState => (
          console.log('Empty images: ', prevState.images),
          console.log('Hits: ', response.data.hits),
          {
            images: [...prevState.images, ...response.data.hits],
            isLoading: false
          }
        )
      );
    } catch (error) {
      console.error('Error at fetch: ', error);
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  handleImageClick = (largeImageUrl, alt) => {
    console.log('Image clicked:', { largeImageUrl, alt });
    this.setState({ largeImageUrl, alt, showModal: true }, () => {
      console.log('State after click:', this.state);
    });
  };

  toggleModal = () => {
    console.log('Modal toggled:', !this.state.showModal);
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  // toggleModal = (largeImageUrl = '') => {
  //   console.log('Modal toggled:', !this.state.showModal);
  //   this.setState(({ prevState }) => ({
  //     showModal: !prevState.showModal,
  //     largeImageUrl,
  //   }));
  // };

  loadMore = (prevState) => {
    console.log("Load more images: ", prevState.page);
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  render() {
    const { images, showModal, largeImageUrl, alt, isLoading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {showModal && (
          <Modal
            largeImageUrl={largeImageUrl}
            alt={alt}
            onClose={this.toggleModal}
          />
        )}
        {isLoading && <Loader />}
        <Button onClick={this.loadMore} isVisible={images.length > 0} />
      </div>
    );
  }
}

export default App;
