import React, { useEffect, useState } from 'react';
import { IOpenGraphMetadata } from '../model/open-graph-metadata.model';

interface ILinksListProps {
  data: ReadonlyArray<IOpenGraphMetadata>;
}

const formatYouTubeDuration = (duration: string): string => {
  const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
  const match = regex.exec(duration);

  if (!match) return '0:00';

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  return [hours > 0 ? String(hours) : null, String(minutes).padStart(hours > 0 ? 2 : 1, '0'), String(seconds).padStart(2, '0')]
    .filter(Boolean)
    .join(':');
};

const LinksList = (props: ILinksListProps) => {
  const { data } = props;

  return (
    <div className="container my-4">
      <div className="row">
        {data &&
          data.map((linkMetadata, index) => {
            // Uncomment the following code to center the last odd item in a row
            // const isLastOdd = data.length % 2 !== 0 && index === data.length - 1;
            return (
              // <div key={index} className={`col-12 col-md-6 p-2 d-flex align-items-stretch ${isLastOdd ? 'mx-auto' : ''}`}>
              <div key={index} className="col-12 col-md-6 p-2 d-flex align-items-stretch">
                <div className="card shadow-sm h-100 d-flex flex-column" style={{ width: '100%' }}>
                  {linkMetadata.url.includes('youtube.com') ? (
                    <>
                      {/* Responsive YouTube iframe */}
                      <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                          src={`https://www.youtube.com/embed/${new URL(linkMetadata.url).searchParams.get('v')}`}
                          title={linkMetadata.title}
                          allowFullScreen
                          className="w-100 h-100"
                        ></iframe>
                      </div>
                    </>
                  ) : (
                    <a href={linkMetadata.url} target="_blank" rel="noopener noreferrer" className="image-hover">
                      <img
                        src={linkMetadata.image}
                        alt={linkMetadata.title}
                        style={{
                          height: 200,
                          width: '100%',
                          objectFit: 'cover',
                          border: '1px solid #eeeeee',
                        }}
                      />
                    </a>
                  )}
                  <div className="card-body d-flex flex-column" style={{ padding: '1.88rem 0.88rem' }}>
                    <h4 className="">{linkMetadata.title}</h4>
                    {/* Multi-line ellipsis truncation */}
                    <p
                      className="card-text"
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3, // Adjust number of lines before truncation
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {linkMetadata.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LinksList;
