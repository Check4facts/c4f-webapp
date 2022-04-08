import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getSearchEntities, getEntities, updateEntity, getArticlesByPublishedAndCategoryName } from '../article/article.reducer';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { Carousel, CarouselIndicators, CarouselItem, CarouselControl, UncontrolledCarousel, CarouselCaption, Button } from 'reactstrap';
import { JhiItemCount, JhiPagination, Translate, translate, getSortState } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { IArticle } from 'app/shared/model/article.model';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

export interface ICarouselProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const HomeCarousel = props => {
  // State for Active index
  const [activeIndex, setActiveIndex] = React.useState(0);

  // State for Search Box input

  // State for Animation
  const [animating, setAnimating] = React.useState(false);


  // Sample items for Carousel
  const items = [
    {
      caption: 'Sample Caption One',
      src: '../../../content/images/carousel1.jpg',
      altText: 'Slide One',
    },
    {
      caption: 'Sample Caption Two',
      src: '../../../content/images/carousel2.jpg',
      altText: 'Slide Two',
    },
    {
      caption: 'Sample Caption Three',
      src: '../../../content/images/carousel3.jpg',
      altText: 'Slide Three',
    },
    {
      caption: 'Sample Caption Four',
      src: '../../../content/images/carousel4.jpg',
      altText: 'Slide Four',
    },
    {
      caption: 'Sample Caption Five',
      src: '../../../content/images/carousel5.jpg',
      altText: 'Slide Five',
    },
  ];

  // Items array length
  const itemLength = items.length - 1;

  // Previous button for Carousel
  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // Next button for Carousel
  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

/*  const startSearching = () => {
    if (props.search) {
      props.getSearchEntities(
        props.paginationState.query,
        props.paginationState.activePage - 1,
        props.paginationState.itemsPerPage,
        `_score,desc`,
        true
      );
    }
  };*/

  const startSearching = () => {
    props.setPaginationState({
      ...props.paginationState,
      query: props.search,
      activePage: 1,
    });
  };

/*
  useEffect(() => {
    startSearching();
  }, [props.paginationState.activePage]);
*/

  const handleSearch = event => props.setSearch(event.target.value);

  // Carousel Item Data
  const carouselItemData = items.map(item => {
    return (
      <CarouselItem className="item" key={item.src} onExited={() => setAnimating(false)} onExiting={() => setAnimating(true)}>
        <img src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });

  return (
    <div className="carousel-div">
      <Carousel previous={previousButton} next={nextButton} activeIndex={activeIndex} dark className="vertical" interval={5000}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={newIndex => {
            if (animating) return;
            setActiveIndex(newIndex);
          }}
        />
        {carouselItemData}
        <CarouselCaption
          captionHeader={<Translate contentKey="home.title" />}
          captionText={
            <>
              <Translate contentKey="home.subtitle" />
              <div>
                <AvForm onSubmit={startSearching} >
                  <AvGroup className="search-group">
                    <AvInput
                      type="text"
                      name="search"
                      className="search-input"
                      value={props.search}
                      onChange={handleSearch}
                      placeholder={translate('check4FactsApp.article.home.search')}
                    />
                    <Button className="search-button">
                      <FontAwesomeIcon icon="search" />
                    </Button>
                  </AvGroup>
                </AvForm>
              </div>
            </>
          }
          className="caption-text"
        ></CarouselCaption>
      </Carousel>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  articleList: storeState.article,
  categories: storeState.category.entities,
  loading: storeState.article.loading,
  totalItems: storeState.article.totalItems,
});

const mapDispatchToProps = {
  getEntities,
  getArticlesByPublishedAndCategoryName,
  updateEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HomeCarousel);
