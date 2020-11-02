import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sub-topic.reducer';
import { ISubTopic } from 'app/shared/model/sub-topic.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubTopicDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubTopicDetail = (props: ISubTopicDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { subTopicEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="check4FactsApp.subTopic.detail.title">SubTopic</Translate> [<b>{subTopicEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="check4FactsApp.subTopic.name">Name</Translate>
            </span>
          </dt>
          <dd>{subTopicEntity.name}</dd>
        </dl>
        <Button tag={Link} to="/sub-topic" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sub-topic/${subTopicEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ subTopic }: IRootState) => ({
  subTopicEntity: subTopic.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubTopicDetail);
