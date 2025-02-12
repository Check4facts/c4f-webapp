import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { fetchOpenGraphMetadata, fetchOpenGraphMetadataForUrls } from 'app/shared/reducers/open-graph';
import { Translate, translate } from 'react-jhipster';
import { Col, Container, Row, Spinner } from 'reactstrap';
import LinksList from 'app/shared/util/links-metadata';

interface IPublicationsItem {
  id: string;
  title: string;
  links: string[];
}

interface IDisseminationProps extends StateProps, DispatchProps {}

export const Dissemination = (props: IDisseminationProps) => {
  const publicationsItems: IPublicationsItem[] = [
    {
      id: 'fact',
      title: translate('dissemination.category.fact'),
      links: [
        // 'https://ktisis.cut.ac.cy/handle/10488/23719', // TODO: This link is broken
        'https://www.technologyreview.com/2018/07/18/141414/how-to-tell-if-youre-talking-to-a-bot/',
        'https://shorensteincenter.org/combating-fake-news-agenda-for-research/',
        'https://hewlett.org/the-effects-of-fact-checking/',
        'https://www.poynter.org/fact-checking/2018/how-do-you-make-fact-checking-viral-make-it-look-like-misinformation/?fbclid=IwAR3QByxEi2J6Uz637u2reujTrqSvXUtkXMHdUJc6nR2sshJt4B34TXaxu20',
      ],
    },
    {
      id: 'media',
      title: translate('dissemination.category.media.main'),
      links: [
        'https://www.efsyn.gr/kosmos/327225_megali-pigi-parapliroforisis-youtube-kataggelloyn-dekades-organismoi-fact-checking',
        'https://www.kathimerini.gr/opinion/561815104/paraplanitikes-eidiseis-kai-polemos/',
        'https://www.dw.com/el/fact-checking-%CE%B5%CE%BD%CE%B1%CE%BD%CF%84%CE%AF%CE%BF%CE%BD-fake-news/a-47007355',
        'https://www.nytimes.com/2016/11/20/business/media/how-fake-news-spreads.html',
        'https://www.pewresearch.org/internet/2017/03/29/the-future-of-free-speech-trolls-anonymity-and-fake-news-online',
      ],
    },
    {
      id: 'video',
      title: translate('dissemination.category.video'),
      links: [
        'https://www.youtube.com/watch?v=1S9EoB83hXY',
        'https://www.youtube.com/watch?v=G5V8bzNGlE8',
        'https://www.youtube.com/watch?v=I4IpJRz5xxQ',
        'https://www.youtube.com/watch?v=Kim9ujIU874',
      ],
    },
  ];

  useEffect(() => {
    const allLinks = publicationsItems.reduce((acc, item) => acc.concat(item.links), []);
    props.fetchOpenGraphMetadataForUrls(allLinks);
  }, []);

  return (
    <Container>
      <Row>
        <Col sm="12">
          <div className="text-left">
            <h1 className="text-center mt-5">
              <Translate contentKey="global.menu.dissemination.main" />
            </h1>
            <p>
              <Translate contentKey="global.menu.dissemination.main-sub1" />
            </p>
            <p>
              <Translate contentKey="global.menu.dissemination.main-sub2" />
            </p>
            <p className="text-secondary fs-15 mb-5 pb-3"></p>
          </div>
        </Col>
      </Row>
      {props.loading ? (
          <div>
            <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
          </div>
      ) : (
        props.data.length > 0 &&
        publicationsItems.map(rowItem => {
          const linksMetadata = props.data.filter(metadata => rowItem.links.includes(metadata.url));
          return (
            <div key={rowItem.id}>
              <h2 className="mb-4 pb-2" style={{ borderBottom: '2px solid #E0E0E0' }}>
                {rowItem.title}
              </h2>
              <LinksList data={linksMetadata} />
            </div>
          );
        })
      )}
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dissemination);
