import React from 'react';
import './summarization.scss';
import { Translate } from 'react-jhipster';
import { NavHashLink } from 'react-router-hash-link';

interface SummaryProps {
  summary: string;
  sourceUrl: string;
}

const SummarizationDisplay: React.FC<SummaryProps> = (props: SummaryProps) => {
  const { summary, sourceUrl } = props;

  return (
    <div className="summarization-display-container">
      <div className="summarization-display">
        <h2>
          <Translate contentKey="check4FactsApp.summarization.display.title" />
        </h2>
        <div dangerouslySetInnerHTML={{ __html: summary }} />
        {sourceUrl && (
          <NavHashLink to={sourceUrl} smooth replace={true}>
            <Translate contentKey="check4FactsApp.summarization.display.sourcesLink" />
          </NavHashLink>
        )}
      </div>
    </div>
  );
};

export default SummarizationDisplay;
