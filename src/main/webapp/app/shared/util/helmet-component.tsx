import React from 'react';
import { Helmet } from 'react-helmet';

interface IHelComp {
  title: string;
  description: string;
  image: string;
  imageType: string;
  publishedDate: string;
  author: string;
}

const HelComp = (props: IHelComp) => {
  const { title, description, image, imageType, publishedDate, author } = props;

  return (
    <Helmet>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`data:${imageType};base64,${image}`} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:article:published_time" content={publishedDate} />
      <meta property="og:article:author" content={author} />
    </Helmet>
  );
};

export default HelComp;
