import React from 'react';
import { Carousel, CarouselIndicators, CarouselItem, CarouselControl, UncontrolledCarousel, CarouselCaption } from 'reactstrap';
import { JhiItemCount, JhiPagination, Translate } from 'react-jhipster';

const HomeCarousel = () => {
  // State for Active index
  const [activeIndex, setActiveIndex] = React.useState(0);

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
        captionText={<Translate contentKey="home.subtitle" />}
        className="caption-text"
      />
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
