import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {Translate, ICrudGetAction, byteSize, TextFormat, translate} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './statement.reducer';
import { IStatement } from 'app/shared/model/statement.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStatementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StatementDetail = (props: IStatementDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { statementEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="check4FactsApp.statement.detail.title">Statement</Translate> [<b>{statementEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="text">
              <Translate contentKey="check4FactsApp.statement.text">Text</Translate>
            </span>
          </dt>
          <dd>{statementEntity.text}</dd>
          <dt>
            <span id="author">
              <Translate contentKey="check4FactsApp.statement.author">Author</Translate>
            </span>
          </dt>
          <dd>{statementEntity.author}</dd>
          <dt>
            <span id="statementDate">
              <Translate contentKey="check4FactsApp.statement.statementDate">Statement Date</Translate>
            </span>
          </dt>
          <dd>
            {statementEntity.statementDate ? (
              <TextFormat value={statementEntity.statementDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="registrationDate">
              <Translate contentKey="check4FactsApp.statement.registrationDate">Registration Date</Translate>
            </span>
          </dt>
          <dd>
            {statementEntity.registrationDate ? (
              <TextFormat value={statementEntity.registrationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="mainArticleTitle">
              <Translate contentKey="check4FactsApp.statement.mainArticleTitle">Main Article Title</Translate>
            </span>
          </dt>
          <dd>{statementEntity.mainArticleTitle}</dd>
          <dt>
            <span id="mainArticleText">
              <Translate contentKey="check4FactsApp.statement.mainArticleText">Main Article Text</Translate>
            </span>
          </dt>
          <dd>{statementEntity.mainArticleText}</dd>
          <dt>
            <span id="mainArticleUrl">
              <Translate contentKey="check4FactsApp.statement.mainArticleUrl">Main Article Url</Translate>
            </span>
          </dt>
          <dd><a href={statementEntity.mainArticleUrl} target="_blank" rel="noopener noreferrer">{statementEntity.mainArticleUrl}</a></dd>
          <dt>
            <Translate contentKey="check4FactsApp.statement.topic">Topic</Translate>
          </dt>
          <dd>{statementEntity.topic ? translate(`fact-checking.sub-menus.${statementEntity.topic.name}`) : ''}</dd>
          <dt>
            <Translate contentKey="check4FactsApp.statement.subTopics">Sub Topics</Translate>
          </dt>
          <dd>{statementEntity.subTopics ? statementEntity.subTopics.join(', ') : ''}</dd>
        </dl>
        <Button tag={Link} to="/statement" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/statement/${statementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ statement }: IRootState) => ({
  statementEntity: statement.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatementDetail);
