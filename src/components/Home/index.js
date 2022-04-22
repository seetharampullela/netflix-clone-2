import {Component} from 'react'
import Header from '../Header'
import Trending from '../Trending'

import './index.css'
import MovieContext from '../../context/MovieContext'
import Footer from '../Footer'
import LoadingElement from '../LoaderElement'
import Originals from '../Originals'


class Home extends Component {

  render() {
    const renderSuccessView = () => {
      const backgroundImage = "https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650251824/Mini%20Project%20Netflix%20Clone/Superman_gjemba.png"

      return (
        <div
          className="spiderman-container"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          <div className="home-header-content">
            <h1 className="movie-details-name">Man of Steel</h1>
            <p className="movie-details-description">Man of steel from superman franchise directed by Zack Snyder</p>
            <button type="button" className="movies-details-play-button">
              Play
            </button>
          </div>
        </div>
      )
    }

    const renderMovieItem = () => {
      this.getAllVideos()
    }

    const renderLoader = () => <LoadingElement />

    const renderFailureView = () => (
      <div className="failure-view-container">
        <img
          alt="failure view"
          src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650297174/Mini%20Project%20Netflix%20Clone/Background-Complete_t8c6zl.png"
          className="failure-image"
        />
        <p className="search-content">Something went wrong. Please try again</p>

        <button
          type="button"
          className="try-again-button"
          onClick={renderMovieItem}
        >
          Try again
        </button>
      </div>
    )

    const getResult = () => {
      const {apiStatus} = this.state
      switch (apiStatus) {
        case apiConstants.success:
          return renderSuccessView()
        case apiConstants.failure:
          return renderFailureView()
        case apiConstants.inProgress:
          return renderLoader()
        default:
          return null
      }
    }

    return (
      <MovieContext.Consumer>
        {value => {
          const {username} = value
          console.log('username from Home', {username})

          return (
            <>
              <div className="home-container" testid="home">
                {getResult()}
                <h1 className="trending-heading">Trending Now</h1>
                <Trending />
                
                <h1 className="trending-heading">Originals</h1>
                <Originals />
              </div>
              <Footer />
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}
export default Home
