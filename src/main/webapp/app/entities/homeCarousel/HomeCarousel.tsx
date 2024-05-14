import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getSearchEntities, getEntities, updateEntity, getArticlesByPublishedAndCategoryName, getSearchSuggestions } from '../article/article.reducer';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { Carousel, CarouselIndicators, CarouselItem, CarouselControl, UncontrolledCarousel, CarouselCaption, Button } from 'reactstrap';
import { JhiItemCount, JhiPagination, Translate, translate, getSortState } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { IArticle } from 'app/shared/model/article.model';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import SearchSuggestionBox from './SearchSuggestionBox';

export interface ICarouselProps extends StateProps, DispatchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setPaginationState: Dispatch<SetStateAction<any>>;
  paginationState: any;
}

const HomeCarousel = (props: ICarouselProps) => {
  // State for Active index
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [timeoutFunc, setTimeoutFunc] = React.useState(null);
  const ref = React.useRef(null);
  // State for Search Box input

  // State for Animation
  const [animating, setAnimating] = React.useState(false);

  // Sample items for Carousel
  const items = [
    {
      caption: 'Sample Caption One',
      src: '../../../content/images/carousel1.webp',
      altText: 'Slide One',
    },
    {
      caption: 'Sample Caption Two',
      src: '../../../content/images/carousel2.webp',
      altText: 'Slide Two',
    },
    {
      caption: 'Sample Caption Three',
      src: '../../../content/images/carousel3.webp',
      altText: 'Slide Three',
    },
    {
      caption: 'Sample Caption Four',
      src: '../../../content/images/carousel4.webp',
      altText: 'Slide Four',
    },
    {
      caption: 'Sample Caption Five',
      src: '../../../content/images/carousel5.webp',
      altText: 'Slide Five',
    },
  ];

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchOpen(false);
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const debounceSearch = (func, delay) => {
    return (...args) => {
      clearTimeout(timeoutFunc);
      setTimeoutFunc(
        setTimeout(() => {
          func(...args);
        }, delay)
      );
    };
  };

  // Items array length
  const itemLength = items.length - 1;

  const handleSearchOpen = func => () => {
    console.log("mpika")
    if (func === 'focus') {
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
    }
  };

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
    searchOpen && setSearchOpen(false);
  };

  const suggestionsSearch = () => {
    // TODO: Implement search functionality
    props.getSearchSuggestions(props.search);
  };

  const delayedStartSearching = debounceSearch(suggestionsSearch, 300);

  useEffect(() => {
    if (props.search.length > 0) {
      delayedStartSearching();
    } else {
      clearTimeout(timeoutFunc);
    }
    return () => {
      clearTimeout(timeoutFunc);
    };
  }, [props.search]);

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
              <div ref={ref}>
                <AvForm onSubmit={startSearching}>
                  <AvGroup className="search-group">
                    <AvInput
                      type="text"
                      name="search"
                      className="search-input"
                      value={props.search}
                      onChange={handleSearch}
                      placeholder={translate('check4FactsApp.article.home.search')}
                      onFocus={handleSearchOpen('focus')}
                      // onBlur={handleSearchOpen('blur')}
                      autocomplete="off"
                    />
                    <Button className="search-button">
                      <FontAwesomeIcon icon="search" />
                    </Button>
                  </AvGroup>
                </AvForm>
                <SearchSuggestionBox searchOpen={searchOpen} searchInput={props.search} suggestions={props.suggestions} handleSearchOpen={handleSearchOpen}/>
                </div>
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
  suggestions: storeState.article.suggestions,
});

const mapDispatchToProps = {
  getEntities,
  getArticlesByPublishedAndCategoryName,
  getSearchSuggestions,
  updateEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HomeCarousel);
