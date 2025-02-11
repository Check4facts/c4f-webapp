import React, { useEffect, useState } from 'react';
import { IOpenGraphMetadata } from '../model/open-graph-metadata.model';
import { fetchOpenGraphMetadata, fetchOpenGraphMetadataForUrls } from '../reducers/open-graph';
import { connect } from 'react-redux';
import { IRootState } from '../reducers';
import axios from 'axios';

// interface YouTubeVideo {
//   id: string;
//   title: string;
//   description: string;
//   thumbnail: string;
//   duration: string;
// }

interface ILinksListProps extends StateProps, DispatchProps {
  links: string[];
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
  const { links, loading, error, data } = props;
  // const [linksMetadata, setLinksMetadata] = useState<IOpenGraphMetadata[]>([]);
  // const [loading, setLoading] = useState(true);
  // const API_KEY = 'API_KEY';

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       const ids = links.join(',');
  //       const url = `https://www.googleapis.com/youtube/v3/videos?id=${ids}&part=snippet,contentDetails&key=${API_KEY}`;
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       if (data.items) {
  //         const videoData: YouTubeVideo[] = data.items.map((video: any) => ({
  //           id: video.id,
  //           title: video.snippet.title,
  //           description: video.snippet.description,
  //           thumbnail: video.snippet.thumbnails.high.url,
  //           duration: formatYouTubeDuration(video.contentDetails.duration),
  //         }));
  //         setLinksMetadata(videoData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching video metadata:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchVideos();
  // }, [links]);

  useEffect(() => {
    // const postAction = async () => {
    //   try {
    //     const response = await axios.post('/api/opengraph/batch', links);
    //     console.log(response);
    //   } catch (e) {
    //     console.error('Error fetching video metadata:', e);
    //   }
    // };
    // // console.log(links);
    // // props.fetchOpenGraphMetadataForUrls(links);
    // postAction();
    props.fetchOpenGraphMetadataForUrls(links);
  }, []);

  // console.log(data);
  return (
    <div className="container my-4">
      <h2 className="mb-4">Video Tutorials</h2>
      {loading ? (
        <p className="text-center text-muted">Loading videos...</p>
      ) : (
        <div className="row">
          {data &&
            data.map((linkMetadata, index) => {
              const isLastOdd = data.length % 2 !== 0 && index === data.length - 1;
              return (
                <div key={index} className={`col-12 col-md-6 p-2 d-flex align-items-stretch ${isLastOdd ? 'mx-auto' : ''}`}>
                  <div className="card shadow-sm h-100 d-flex flex-column">
                    {/* Responsive YouTube iframe */}
                    {/* <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        src={`https://www.youtube.com/embed/${linkMetadata.id}`}
                        title={linkMetadata.title}
                        allowFullScreen
                        className="w-100 h-100"
                      ></iframe>
                    </div> */}
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
                      {/* <p className="text-truncate" style={{ maxHeight: '5rem' }}>
                      {video.description}
                    </p> */}
                      {/* Truncate description with max height and overflow hidden */}
                      {/* <p className="card-text overflow-hidden" style={{ maxHeight: '5rem' }}>
                      {video.description}
                    </p> */}
                      {/* <p className="text-primary fw-bold mt-auto">Διάρκεια: {video.duration}</p> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.openGraph.loading,
  error: storeState.openGraph.error,
  data: storeState.openGraph.data,
});

const mapDispatchToProps = {
  fetchOpenGraphMetadataForUrls,
  fetchOpenGraphMetadata,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LinksList);
