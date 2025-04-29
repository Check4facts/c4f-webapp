import { IRootState } from 'app/shared/reducers';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { getEntities } from './feature-toggle.reducer';

export interface IFeatureToggleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FeatureToggle = (props: IFeatureToggleProps) => {
  useEffect(() => {
    // Fetch feature toggles when the component mounts
    props.getEntities();
  }, []);

  const { featureToggleList, match, loading } = props;
  return (
    <div>
      <h2 id="feature-toggle-heading">
        Feature Toggles
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          Create new Feature Toggle
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <Table responsive striped>
            <thead>
              <tr>
                <th>Key</th>
                <th>Enabled</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {featureToggleList.map((featureToggle, i) => (
                <tr key={`entity-${i}`}>
                  <td>{featureToggle.key}</td>
                  <td>{featureToggle.enabled ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <Button tag={Link} to={`${match.url}/${featureToggle.key}`} color="link" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ featureToggle }: IRootState) => ({
  featureToggleList: featureToggle.entities,
  loading: featureToggle.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FeatureToggle);
