import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './resource.reducer';
import { IResource } from 'app/shared/model/resource.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResourceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResourceDetail = (props: IResourceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { resourceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="check4FactsApp.resource.detail.title">Resource</Translate> [<b>{resourceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="url">
              <Translate contentKey="check4FactsApp.resource.url">Url</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.url}</dd>
          <dt>
            <span id="harvestIteration">
              <Translate contentKey="check4FactsApp.resource.harvestIteration">Harvest Iteration</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.harvestIteration}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="check4FactsApp.resource.title">Title</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.title}</dd>
          <dt>
            <span id="snippet">
              <Translate contentKey="check4FactsApp.resource.snippet">Snippet</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.snippet}</dd>
          <dt>
            <span id="htmlSnippet">
              <Translate contentKey="check4FactsApp.resource.htmlSnippet">Html Snippet</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.htmlSnippet}</dd>
          <dt>
            <span id="fileFormat">
              <Translate contentKey="check4FactsApp.resource.fileFormat">File Format</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.fileFormat}</dd>
          <dt>
            <span id="body">
              <Translate contentKey="check4FactsApp.resource.body">Body</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.body}</dd>
          <dt>
            <span id="harvestDate">
              <Translate contentKey="check4FactsApp.resource.harvestDate">Harvest Date</Translate>
            </span>
          </dt>
          <dd>
            {resourceEntity.harvestDate ? <TextFormat value={resourceEntity.harvestDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="check4FactsApp.resource.statement">Statement</Translate>
          </dt>
          <dd>{resourceEntity.statement ? resourceEntity.statement.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/resource" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/resource/${resourceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ resource }: IRootState) => ({
  resourceEntity: resource.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail);
