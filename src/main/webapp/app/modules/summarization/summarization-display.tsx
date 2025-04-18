import React from 'react';
import './summarization.scss';
import { Translate } from 'react-jhipster';
import { NavHashLink } from 'react-router-hash-link';

interface SummaryProps {
  summary: string;
  sourceUrl: string;
  accuracy: number;
}

const SummarizationDisplay: React.FC<SummaryProps> = (props: SummaryProps) => {
  const { accuracy, summary, sourceUrl } = props;

  const scrollWithOffset = el => {
    const yCoordinate = el.getBoundingClientRect().top;
    const yOffset = -1000;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <div className="summarization-display-container">
      <div className={`summarization-display summary-accuracy-${accuracy}`}>
        <h2>
          <Translate contentKey="check4FactsApp.summarization.display.title" />
        </h2>
        <div dangerouslySetInnerHTML={{ __html: summary }} />
        {sourceUrl && (
          <NavHashLink to={sourceUrl} smooth replace={true} scroll={el => scrollWithOffset(el)}>
            <Translate contentKey="check4FactsApp.summarization.display.sourcesLink" />
          </NavHashLink>
        )}
      </div>
    </div>
  );
};

export default SummarizationDisplay;
