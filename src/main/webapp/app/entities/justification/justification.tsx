import './justification.scss';
import React, { useEffect, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { Button } from 'reactstrap';
import { getLatestJustification, reset as justificationReset } from './justification.reducer';
import { connect } from 'react-redux';
import { Translate } from 'react-jhipster';
import moment from 'moment';

interface IJustificationProps extends StateProps, DispatchProps {
  statementId: number;
}

const Justification = (props: IJustificationProps) => {
  const { statementId, loading, justification } = props;

  useEffect(() => {
    if (statementId) {
      props.getLatestJustification(statementId);
    }
  }, [statementId]);

  return loading ? (
    <></>
  ) : (
    <div className="justification">
      <h3>
        <Translate contentKey="check4FactsApp.justification.home.title" />
      </h3>
      {justification !== null ? (
        <div key={justification.id} className="entry">
          <p className="text">{justification.text}</p>
          <h4>
            <Translate contentKey="check4FactsApp.justification.sources" />
          </h4>
          <ul>
            {justification.sources?.map((source, index) => (
              <li key={`source-${index}`}>
                <a className="source" href={source} target="_blank" rel="noopener noreferrer">
                  {source}
                </a>
              </li>
            ))}
          </ul>
          <div className="bottom-info">
            <ul className="inline-list">
              <li>
                <Translate contentKey="check4FactsApp.justification.model" />: <span>{justification.model}</span>
              </li>
              <li>
                <Translate contentKey="check4FactsApp.justification.timestamp" />:{' '}
                <span>{moment(justification.timestamp).format('LL')}</span>
              </li>
              <li>
                <Translate contentKey="check4FactsApp.justification.elapsedTime" />: <span>{justification.elapsedTime}</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="empty">
          <p className="prompt">
            <Translate contentKey="check4FactsApp.justification.home.createLabel" />
          </p>
          <Button color="warning" type="button">
            <Translate contentKey="check4FactsApp.justification.home.button" />
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  justification: storeState.justification.entity,
  loading: storeState.justification.loading,
});

const mapDispatchToProps = {
  getLatestJustification,
  justificationReset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Justification);
