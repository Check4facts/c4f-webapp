import React from 'react';
import SideMenuTemplate from 'app/shared/layout/templates/side-menu-template';
import {Translate, translate} from 'react-jhipster';
import {Col, Container, Row} from 'reactstrap';

export const Dissemination = () => {
  const publicationsItems = [
    {
      id: 'fact',
      title: translate('dissemination.category.fact'),
      content: (
        <div>
          <p><span className="fs-15">Spyridou, Lia - Paschalia & Vatikiotis, Pantelis & Milioni, Dimitra. (2021).</span><br/>
            <a className="" href="https://ktisis.cut.ac.cy/handle/10488/23719">ΔΗΜΟΣΙΟΓΡΑΦΙΑ, ΨΕΥΔΕΙΣ ΕΙΔΗΣΕΙΣ &
              ΠΑΡΑΠΛΗΡΟΦΟΡΗΣΗ</a><br/>
            <span className="fs-15">Εγχειρίδιο Δημοσιογραφικής Εκπαίδευσης και Κατάρτισης (Σειρά της UNESCO για τη Δημοσιογραφική Εκπαίδευση).</span>
            <br/>
          </p>
          {/*          <h4 className="mt-5 mb-3">
            Διάφοροι Σύνδεσμοι
          </h4>*/}
          <ul className="mt-4" style={{listStyle: "none", padding: "0px"}}>
            <li className="mb-3"><a
              href="https://www.technologyreview.com/2018/07/18/141414/how-to-tell-if-youre-talking-to-a-bot/">How to
              tell if you’re talking to a bot</a></li>
            <li className="mb-3"><a href="https://shorensteincenter.org/combating-fake-news-agenda-for-research/">Combating
              Fake News: An Agenda for Research and Action</a></li>
            <li className="mb-3"><a href="https://hewlett.org/the-effects-of-fact-checking/">The Effects of
              Fact-Checking</a></li>
            <li className="mb-3"><a
              href="https://www.poynter.org/fact-checking/2018/how-do-you-make-fact-checking-viral-make-it-look-like-misinformation/?fbclid=IwAR3QByxEi2J6Uz637u2reujTrqSvXUtkXMHdUJc6nR2sshJt4B34TXaxu20">How
              do you make fact-checking viral? Make it look like misinformation.</a></li>
          </ul>
        </div>
      ),
    },
    {
      id: 'media',
      title: translate('dissemination.category.media.main'),
      content: (
        <div>
          <ul style={{listStyle: "none", padding: "0px"}}>
            <li className="mb-3"><a
              href="https://www.efsyn.gr/kosmos/327225_megali-pigi-parapliroforisis-youtube-kataggelloyn-dekades-organismoi-fact-checking">Μεγάλη
              πηγή παραπληροφόρησης το YouTube, καταγγέλλουν δεκάδες οργανισμοί fact checking</a></li>
            <li className="mb-3"><a
              href="https://www.kathimerini.gr/opinion/561815104/paraplanitikes-eidiseis-kai-polemos/">Παραπλανητικές
              ειδήσεις και πόλεμος</a></li>
            <li className="mb-3"><a
              href="https://www.dw.com/el/fact-checking-%CE%B5%CE%BD%CE%B1%CE%BD%CF%84%CE%AF%CE%BF%CE%BD-fake-news/a-47007355">Fact
              Checking εναντίον Fake News
            </a></li>
            <li className="mb-3"><a href="https://www.nytimes.com/2016/11/20/business/media/how-fake-news-spreads.html">How
              Fake News Goes Viral: A Case Study</a></li>
            <li className="mb-3"><a
              href="https://www.pewresearch.org/internet/2017/03/29/the-future-of-free-speech-trolls-anonymity-and-fake-news-online">The
              Future of Free Speech, Trolls, Anonymity and Fake News Online
            </a></li>
          </ul>
        </div>
      ),
    },
    {
      id: 'video',
      title: translate('dissemination.category.video'),
      content: (
        <div>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/G5V8bzNGlE8"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
          </div>
          <div className="embed-responsive embed-responsive-16by9 mt-3">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/I4IpJRz5xxQ"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
          </div>
          <div className="embed-responsive embed-responsive-16by9 mt-3">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Kim9ujIU874"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <Row>
        <Col sm="12">
          <div className="text-left">
            <h1 className="text-center mt-5">
              <Translate contentKey="global.menu.dissemination.main"/>
            </h1>
            <p>
              <Translate contentKey="global.menu.dissemination.main-sub1"/>
            </p>
            <p>
              <Translate contentKey="global.menu.dissemination.main-sub2"/>
            </p>
            <p className="text-secondary fs-15 mb-5 pb-3"></p>
          </div>
        </Col>
      </Row>
      <SideMenuTemplate items={publicationsItems}/>
    </Container>
  );
};

export default Dissemination;
