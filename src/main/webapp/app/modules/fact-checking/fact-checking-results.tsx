import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Table, Button, Container, Spinner } from 'reactstrap';
import { setFact } from 'app/modules/fact-checking/fact-checking.reducer';
import { getEntity as getStatement, updateEntity as updateStatement } from 'app/entities/statement/statement.reducer';
import { getStatementSourcesByStatement } from 'app/entities/statement-source/statement-source.reducer';
import { getResourcesByStatement } from 'app/entities/resource/resource.reducer';
import { getFeatureStatementsByStatement } from 'app/entities/feature-statement/feature-statement.reducer';
import { translate, Translate } from 'react-jhipster';
import moment from "moment";

export interface IFactCheckingResultsProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FactCheckingResults = (props: IFactCheckingResultsProps) => {

  useEffect(() => {
    props.setFact(props.match.params.id);
    props.getStatement(props.match.params.id);
    props.getStatementSourcesByStatement(props.match.params.id);
    props.getFeatureStatementsByStatement(parseInt(props.match.params.id, 10));
    props.getResourcesByStatement(props.match.params.id);
  }, []);

  const { currentLocale, statement, sLoading, statementSources, resources, rLoading, featureStatements } = props;

  const toggleFactCheckerLabel = () => (
    props.updateStatement({
      ...statement,
      statementSources: [...statementSources],
      resources: [...resources],
      factCheckerLabel: !statement.factCheckerLabel
    })
  )

  return sLoading || rLoading || (featureStatements.length === 0) ? (
    <div>
      <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
    </div>
  ) : (
    <>
      <Container>
        <Row className="text-center my-5 text-primary">
          <Col>
            <h1>{translate('fact-checking.results.title')}</h1>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h3>{translate("fact-checking.harvest.statement")}</h3>
          </Col>
        </Row>
        <Row className="text-center my-3">
          <Col>
            <h5>{statement.text}</h5>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h4>{translate("check4FactsApp.statement.author")}</h4>
          </Col>
          <Col>
            <h4>{translate("check4FactsApp.statement.statementDate")}</h4>
          </Col>
        </Row>
        <Row className="text-center my-3">
          <Col>
            <h5>{statement.author}</h5>
          </Col>
          <Col>
            <h5>{moment.locale(currentLocale) && moment(statement.statementDate).format("LL")}</h5>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h4>{translate("fact-checking.results.model.label")}</h4>
          </Col>
          <Col>
            <h4>{translate("fact-checking.results.model.probability")}</h4>
          </Col>
        </Row>
        <Row className="text-center my-3">
          <Col>
            {featureStatements[0].predictLabel ? (
              <h5 className="text-success">Αληθής</h5>
            ) : (
              <h5 className="text-danger">Ψευδής</h5>
            )}
          </Col>
          <Col>
            <h5 className={featureStatements[0].predictProba > 0.5 ? 'text-success' : 'text-danger'}>{featureStatements[0].predictProba * 100}%</h5>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h4>{translate("fact-checking.results.model.emotions")}</h4>
          </Col>
        </Row>
        <Row className="text-center my-3 text-primary border-bottom">
          <Col><h5>Πεδίο</h5></Col>
          <Col><h5>Θυμός</h5></Col>
          <Col><h5>Απέχθεια</h5></Col>
          <Col><h5>Φόβος</h5></Col>
          <Col><h5>Χαρά</h5></Col>
          <Col><h5>Λύπη</h5></Col>
          <Col><h5>Έκπληξη</h5></Col>
        </Row>
        <Row className="text-center">
          <Col><p>Δήλωση</p></Col>
          <Col><p>{((featureStatements[0].sEmotionAnger[3] / featureStatements[0].sFertileTerms) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((featureStatements[0].sEmotionDisgust[3] / featureStatements[0].sFertileTerms) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((featureStatements[0].sEmotionFear[3] / featureStatements[0].sFertileTerms) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((featureStatements[0].sEmotionHappiness[3] / featureStatements[0].sFertileTerms) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((featureStatements[0].sEmotionSadness[3] / featureStatements[0].sFertileTerms) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((featureStatements[0].sEmotionSurprise[3] / featureStatements[0].sFertileTerms) * 100).toFixed(2)}%</p></Col>
        </Row>
        <Row className="text-center">
          <Col><p>Τίτλοι</p></Col>
          <Col><p>{(featureStatements[0].rTitleEmotionAnger[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rTitleEmotionDisgust[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rTitleEmotionFear[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rTitleEmotionHappiness[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rTitleEmotionSadness[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rTitleEmotionSurprise[3] * 100).toFixed(2)}%</p></Col>
        </Row>
        <Row className="text-center">
          <Col><p>Κείμενα</p></Col>
          <Col><p>{(featureStatements[0].rBodyEmotionAnger[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rBodyEmotionDisgust[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rBodyEmotionFear[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rBodyEmotionHappiness[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rBodyEmotionSadness[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rBodyEmotionSurprise[3] * 100).toFixed(2)}%</p></Col>
        </Row>
        <Row className="text-center">
          <Col><p>Αντιπροσωπ/τερες Παράγραφοι</p></Col>
          <Col><p>{(featureStatements[0].rSimParEmotionAnger[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimParEmotionDisgust[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimParEmotionFear[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimParEmotionHappiness[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimParEmotionSadness[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimParEmotionSurprise[3] * 100).toFixed(2)}%</p></Col>
        </Row>
        <Row className="text-center border-bottom">
          <Col><p>Αντιπροσωπ/τερες Προτάσεις</p></Col>
          <Col><p>{(featureStatements[0].rSimSentEmotionAnger[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimSentEmotionDisgust[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimSentEmotionFear[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimSentEmotionHappiness[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimSentEmotionSadness[3] * 100).toFixed(2)}%</p></Col>
          <Col><p>{(featureStatements[0].rSimSentEmotionSurprise[3] * 100).toFixed(2)}%</p></Col>
        </Row>
        <Row className="text-center mt-5 mb-3 text-info">
          <Col>
            <h4>{translate("fact-checking.results.model.rest")}</h4>
          </Col>
        </Row>
        <Row className="text-center my-3 text-primary border-bottom">
          <Col><h5>Πεδίο</h5></Col>
          <Col><h5>Αντικειμενικότητα</h5></Col>
          <Col><h5>Πολικότητα</h5></Col>
          <Col><h5>Ομοιότητα με Δήλωση</h5></Col>
        </Row>
        <Row className="text-center">
          <Col><p>Δήλωση</p></Col>
          <Col><p>{((1 - featureStatements[0].sSubjectivity) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((1 - featureStatements[0].sSentiment) * 100).toFixed(2)}%</p></Col>
          <Col><p>-</p></Col>
        </Row>
        <Row className="text-center">
          <Col><p>Τίτλοι</p></Col>
          <Col><p>{((1 - featureStatements[0].rTitleSubjectivity) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((1 - featureStatements[0].rTitleSentiment) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((1 - featureStatements[0].rTitleSimilarity) * 100).toFixed(2)}%</p></Col>
        </Row>
        <Row className="text-center">
          <Col><p>Κείμενα</p></Col>
          <Col><p>{((1 - featureStatements[0].rBodySubjectivity) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((1 - featureStatements[0].rBodySentiment) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((1 - featureStatements[0].rBodySimilarity) * 100).toFixed(2)}%</p></Col>
        </Row>
        <Row className="text-center">
          <Col><p>Αντιπροσωπ/τερες Παράγραφοι</p></Col>
          <Col><p>{((1 - featureStatements[0].rSimParSubjectivity) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((1 - featureStatements[0].rSimParSentiment) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((1 - featureStatements[0].rSimParSimilarity) * 100).toFixed(2)}%</p></Col>
        </Row>
        <Row className="text-center border-bottom">
          <Col><p>Αντιπροσωπ/τερες Προτάσεις</p></Col>
          <Col><p>{((1 - featureStatements[0].rSimSentSubjectivity) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((1 - featureStatements[0].rSimSentSentiment) * 100).toFixed(2)}%</p></Col>
          <Col><p>{((1 - featureStatements[0].rSimSentSimilarity) * 100).toFixed(2)}%</p></Col>
        </Row>
        <Row className="my-3">
          <Col>
            <p className="text-muted">
              <ul>
                <li>Οι τιμές που αφορούν το πεδίο «Δήλωση» αναφέρονται στο ποσοστό των όρων που ταυτοποιήθηκαν με το εκάστοτε χαρακτηριστικό.</li>
                <li>Tα πεδία «Τίτλοι», «Κείμενα», «Αντιπροσωπ/τερες Παράγραφοι» και «Αντιπροσωπ/τερες Προτάσεις» αναφέρονται στο σύνολο των αντίστοιχων πεδίων που προκύπτουν από τις πηγές που ανακτήθηκαν. Οι τιμές των πεδίων αυτών αναφέρονται στο ποσοστό των προτάσεων που ταυτοποιήθηκαν με το εκάστοτε χαρακτηριστικό.</li>
              </ul>
            </p>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="d-flex justify-content-center" md={{ size: 4, offset: 4 }}>
            <Button tag={Link} to="/article/new" color="info">
              {translate("fact-checking.harvest.action.createArticle")}
            </Button>
          </Col>
        </Row>
        <Row className="mt-5 text-center">
          <Col>
            <h5>Με βάση τα παραπάνω στοιχεία μπορείτε να αλλάξετε την κατάσταση της δήλωσης αυτής</h5>
            <p>
              Η τωρινή της κατάσταση φαίνεται στο παρακάτω κουμπί.<br/>
              Πατείστε πάνω σε αυτό για να γίνει αλλαγή στην αντίθετη.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              color={statement.factCheckerLabel ? 'success' : 'danger'}
              onClick={toggleFactCheckerLabel}
            >
              {statement.factCheckerLabel ? 'Αληθής' : 'Ψευδής'}
            </Button>
          </Col>
        </Row>
        <Row className="text-center mt-5 mb-2 text-info">
          <Col>
            <h3>{translate("fact-checking.results.model.retrieved")}</h3>
          </Col>
        </Row>
      </Container>
      {resources.length > 0 ? (
        <Table responsive>
          <thead>
          <tr>
            <th>AA</th>
            <th>
              <Translate contentKey="check4FactsApp.resource.url">Url</Translate>
            </th>
            <th>
              <Translate contentKey="check4FactsApp.resource.title">Title</Translate>
            </th>
            <th>
              <Translate contentKey="check4FactsApp.resource.simSentence">Sim Sentence</Translate>
            </th>
            <th>
              <Translate contentKey="check4FactsApp.resource.simParagraph">Sim Paragraph</Translate>
            </th>
          </tr>
          </thead>
          <tbody>
          {resources.filter(filRes => filRes.title !==null && filRes.body !== null).map((response, i) => (
            <tr key={`entity-${i}`}>
              <td>{i +1}</td>
              <td style={{ maxWidth: '8vw' }}><a href={response.url} target="_blank" rel="noopener noreferrer">{response.url}</a></td>
              <td style={{ maxWidth: '8vw' }}>{response.title}</td>
              <td style={{ maxWidth: '12vw' }}>{response.simSentence}</td>
              <td style={{ maxWidth: '15vw' }}><div className="ellipsis">{response.simParagraph}</div></td>
            </tr>
          ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
  statement: storeState.statement.entity,
  sLoading: storeState.statement.loading,
  statementSources: storeState.statementSource.entities,
  resources: storeState.resource.entities,
  rLoading: storeState.resource.loading,
  featureStatements: storeState.featureStatement.entities,
  fLoading: storeState.featureStatement.loading
});

const mapDispatchToProps = {
  setFact,
  getStatement,
  updateStatement,
  getStatementSourcesByStatement,
  getResourcesByStatement,
  getFeatureStatementsByStatement
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactCheckingResults);
