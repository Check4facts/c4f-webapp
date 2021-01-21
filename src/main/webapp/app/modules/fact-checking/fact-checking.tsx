import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Translate, translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { convertDateTimeToServer, displayDefaultDateTime} from "app/shared/util/date-utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { TabContent, TabPane, Table, Row, Col, Label, Button, Container } from 'reactstrap';
import { createEntity as createStatement } from 'app/entities/statement/statement.reducer';
import { getEntities as getTopics } from "app/entities/topic/topic.reducer";
import { getEntities as getSubTopics } from "app/entities/sub-topic/sub-topic.reducer";
import { reset } from "app/modules/fact-checking/fact-checking.reducer";
import {IStatementSource} from "app/shared/model/statement-source.model";
import {mapIdList} from "app/shared/util/entity-utils";

export interface IFactCheckingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FactChecking = (props: IFactCheckingProps) => {
  const statementSourceFormRef = useRef(AvForm);
  const [activeTab, setActiveTab] = useState('1');
  const [statementSources, setStatementSources] = useState([] as IStatementSource[]);

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const { topics, subTopics } = props;

  const handleClose = () => {
    props.history.push('/fact-checking/analyze/' + props.statement.id);
  }

  useEffect(() => {
    props.reset();
    props.getTopics();
    props.getSubTopics();
  }, []);

  useEffect(() => {
    if (props.updateStatementSuccess) {
      handleClose();
    }
  }, [props.updateStatementSuccess]);

  const beforeAdd = event => {
    event.stopPropagation();
  };

  const addStatementSource = (event, errors, values) => {
    if (errors.length === 0) {
      setStatementSources(statementSources.concat([{...values}]));
      statementSourceFormRef.current.reset();
    }
  };

  const removeStatementSource = index => {
    setStatementSources(statementSources.filter(ss => ss !== statementSources[index]));
  }

  const saveStatement = (event, errors, values) => {
    values.statementDate = convertDateTimeToServer(values.statementDate);

    if (errors.length === 0) {
      const entity = {
        ...values,
        statementSources,
        subTopics: mapIdList(values.subTopics)
      };

      props.createStatement(entity);
    }
  };

  return (
    <Container fluid className="my-5">
      <Row className="my-5">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h1 className="text-center text-primary">
            {translate('fact-checking.title')}
          </h1><br/>
          <p className="text-info">
            <Translate contentKey="fact-checking.page-guide.main" /><br/>
            <ul style={{ fontWeight: 'bold', marginBottom: '0' }}>
              <li><Translate contentKey="fact-checking.page-guide.one" /></li>
              <li><Link className="text-info" to={'/statement'}><Translate contentKey="fact-checking.page-guide.two"/></Link></li>
            </ul>
            <Translate contentKey="fact-checking.page-guide.rest" />
          </p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <AvForm model={{}} onSubmit={saveStatement}>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Col md={{ size: 8, offset: 2 }}>
                  <h4 className="text-center">{translate("fact-checking.check.titles.first")}</h4>
                  <AvGroup>
                    <Label id="textLabel" for="statement-text">
                      <Translate contentKey="check4FactsApp.statement.text">Text</Translate>{' '}(*)
                    </Label>
                    <AvInput
                      id="statement-text"
                      type="textarea"
                      name="text"
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') },
                      }}
                    />
                  </AvGroup>
                  <AvGroup>
                    <Label id="authorLabel" for="statement-author">
                      <Translate contentKey="check4FactsApp.statement.author">Author</Translate>{' '}(*)
                    </Label>
                    <AvField id="statement-author" type="text" name="author" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="statementDateLabel" for="statement-statementDate">
                      <Translate contentKey="check4FactsApp.statement.statementDate">Statement Date</Translate>{' '}(*)
                    </Label>
                    <AvInput
                      id="statement-statementDate"
                      type="datetime-local"
                      className="form-control"
                      name="statementDate"
                      placeholder={'YYYY-MM-DD HH:mm'}
                      value={displayDefaultDateTime()}
                    />
                  </AvGroup>
                  <AvGroup>
                    <Label id="mainArticleTextLabel" for="statement-mainArticleText">
                      <Translate contentKey="check4FactsApp.statement.mainArticleText">Main Article Text</Translate>
                    </Label>
                    <AvInput id="statement-mainArticleText" type="textarea" name="mainArticleText" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="mainArticleUrlLabel" for="statement-mainArticleUrl">
                      <Translate contentKey="check4FactsApp.statement.mainArticleUrl">Main Article Url</Translate>
                    </Label>
                    <AvInput id="statement-mainArticleUrl" type="textarea" name="mainArticleUrl" />
                  </AvGroup>
                  <AvGroup>
                    <Label for="statement-topic">
                      <Translate contentKey="check4FactsApp.statement.topic">Topic</Translate>{' '}(*)
                    </Label>
                    <AvInput id="statement-topic" type="select" className="form-control" name="topic.id">
                      <option value="" key="0" />
                      {topics
                        ? topics.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {translate(`fact-checking.sub-menus.${otherEntity.name}`)}
                          </option>
                        ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="statement-subTopics">
                      <Translate contentKey="check4FactsApp.statement.subTopics">Sub Topics</Translate>
                    </Label>
                    <AvInput
                      id="statement-subTopics"
                      type="select"
                      multiple
                      className="form-control"
                      name="subTopics"
                    >
                      <option value="" key="0" />
                      {subTopics
                        ? subTopics.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <Button className="float-right" color="primary" type="button" onClick={() => toggle('2')}>
                    <FontAwesomeIcon icon="arrow-right" />
                    &nbsp;
                    <Translate contentKey="entity.action.next" />
                  </Button>
                </Col>
              </TabPane>
              <TabPane tabId="2">
                <Col md={{ size: 8, offset: 2 }}>
                  <h4 className="text-center">{translate("fact-checking.check.titles.second")}</h4>
                  <p className="text-center text-muted">Δεν είναι υποχρεωτικό να εισάγετε κάποια πηγή</p>
                  {statementSources.length > 0 ? (
                    <Col md={{ size: 10, offset: 1 }}>
                      <Table responsive>
                        <thead>
                        <tr>
                          <th>#</th>
                          <th>
                            <Translate contentKey="check4FactsApp.statementSource.url">Url</Translate>
                          </th>
                          <th>
                            <Translate contentKey="check4FactsApp.statementSource.title">Title</Translate>
                          </th>
                          <th>
                            <Translate contentKey="check4FactsApp.statementSource.snippet">Snippet</Translate>
                          </th>
                          <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {statementSources.map((statementSource, i) => (
                          <tr key={`entity-${i}`}>
                            <td>{i+1}</td>
                            <td>{statementSource.url}</td>
                            <td>{statementSource.title}</td>
                            <td>{statementSource.snippet}</td>
                            <td className="text-right">
                              <Button color="danger" onClick={() => removeStatementSource(i)}>
                                <FontAwesomeIcon icon="trash" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                    </Col>
                  ) : (
                    <Col md={{ size: 4, offset: 4 }} className="alert alert-warning text-center">
                      <Translate contentKey="fact-checking.check.statementSources.notAdded"/>
                    </Col>
                  )}
                  <AvForm
                    model={{}}
                    beforeSubmitValidation={beforeAdd}
                    onSubmit={addStatementSource}
                    ref={statementSourceFormRef}
                  >
                    <AvGroup>
                      <Label id="urlLabel" for="statement-source-url">
                        <Translate contentKey="check4FactsApp.statementSource.url">Url</Translate>
                      </Label>
                      <AvInput
                        id="statement-source-url"
                        type="textarea"
                        name="url"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') },
                        }}
                      />
                    </AvGroup>
                    <AvGroup>
                      <Label id="titleLabel" for="statement-source-title">
                        <Translate contentKey="check4FactsApp.statementSource.title">Title</Translate>
                      </Label>
                      <AvField id="statement-source-title" type="text" name="title" />
                    </AvGroup>
                    <AvGroup>
                      <Label id="snippetLabel" for="statement-source-snippet">
                        <Translate contentKey="check4FactsApp.statementSource.snippet">Snippet</Translate>
                      </Label>
                      <AvInput id="statement-source-snippet" type="textarea" name="snippet" />
                    </AvGroup>
                    <Col md={{ size: 4, offset: 4 }} className="text-center">
                      <Button color="primary" id="add-entity" type="submit">
                        <FontAwesomeIcon icon="plus" />
                        &nbsp;
                        <Translate contentKey="fact-checking.check.statementSources.add"/>
                      </Button>
                    </Col>
                  </AvForm>
                  <div className="float-right">
                    <Button color="info" type="button" onClick={() => toggle('1')}>
                      <FontAwesomeIcon icon="arrow-left" />
                      &nbsp;
                      <Translate contentKey="entity.action.previous" />
                    </Button>
                    &nbsp;
                    <Button color="primary" id="save-entity" type="submit">
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <Translate contentKey="entity.action.save">Save</Translate>
                    </Button>
                  </div>
                </Col>
              </TabPane>
            </TabContent>
          </AvForm>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
  topics: storeState.topic.entities,
  subTopics: storeState.subTopic.entities,
  updateStatementSuccess: storeState.statement.updateSuccess,
  statement: storeState.statement.entity
});

const mapDispatchToProps = {
  createStatement,
  getTopics,
  getSubTopics,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactChecking);
