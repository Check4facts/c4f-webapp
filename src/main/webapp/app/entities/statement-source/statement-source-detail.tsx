import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './statement-source.reducer';
import { IStatementSource } from 'app/shared/model/statement-source.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStatementSourceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StatementSourceDetail = (props: IStatementSourceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { statementSourceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="check4FactsApp.statementSource.detail.title">StatementSource</Translate> [<b>{statementSourceEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="url">
              <Translate contentKey="check4FactsApp.statementSource.url">Url</Translate>
            </span>
          </dt>
          <dd>{statementSourceEntity.url}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="check4FactsApp.statementSource.title">Title</Translate>
            </span>
          </dt>
          <dd>{statementSourceEntity.title}</dd>
          <dt>
            <span id="snippet">
              <Translate contentKey="check4FactsApp.statementSource.snippet">Snippet</Translate>
            </span>
          </dt>
          <dd>{statementSourceEntity.snippet}</dd>
          <dt>
            <Translate contentKey="check4FactsApp.statementSource.statement">Statement</Translate>
          </dt>
          <dd>{statementSourceEntity.statement ? statementSourceEntity.statement.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/statement-source" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/statement-source/${statementSourceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ statementSource }: IRootState) => ({
  statementSourceEntity: statementSource.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatementSourceDetail);
