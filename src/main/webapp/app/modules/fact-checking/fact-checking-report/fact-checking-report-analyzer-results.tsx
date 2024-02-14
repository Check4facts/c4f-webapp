import React, { useState } from 'react';
import { Row, Col, Collapse, Button, Table } from 'reactstrap';
import {translate} from "react-jhipster";
import { IStatement } from 'app/shared/model/statement.model';
import moment from 'moment';
import { IFeatureStatement } from 'app/shared/model/feature-statement.model';
import { Link } from 'react-router-dom';

interface IFactCheckingReportAnalyzerResults {
statement: IStatement;
currentLocale: string;
featureStatement: IFeatureStatement;
setFactCheckerAccuracy: (id: number, accuracy: number) => void;
}


const FactchekcingReportAnalyzerResults = (props: IFactCheckingReportAnalyzerResults) => {
  const { statement, currentLocale, featureStatement, setFactCheckerAccuracy } = props;
  const [emotionCollapse, setEmotionCollapse] = useState(false);
  const [restCollapse, setRestCollapse] = useState(false);

  const changeFactCheckerAccuracy = event => {
    setFactCheckerAccuracy(statement.id, event.target.value);
    // TODO Add corresponding call for FeatureStatement when column is added to table.
  };
  
  return (
    <>
    <Row className="text-center my-5 text-primary">
          <Col>
            <h1>{translate('fact-checking.results.title')}</h1>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h3>{translate("fact-checking.analyze.statement")}</h3>
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
          <Col>
            <h4>{translate("check4FactsApp.statement.publicationDate")}</h4>
          </Col>
          <Col>
            <h4>{translate("check4FactsApp.statement.registrationDate")}</h4>
          </Col>
        </Row>
        <Row className="text-center my-3">
          <Col>
            <h5>{statement.author}</h5>
          </Col>
          <Col>
            <h5>{moment.locale(currentLocale) && moment(statement.statementDate).format("LL")}</h5>
          </Col>
          <Col>
            <h5>{moment.locale(currentLocale) && moment(statement.publicationDate).format("LL")}</h5>
          </Col>
          <Col>
            <h5>{moment.locale(currentLocale) && moment(statement.registrationDate).format("LL")}</h5>
          </Col>
        </Row>
        {featureStatement.predictProba > 0 ? <><Row className="text-center my-3 text-info">
            <Col>
              <h4>{translate("fact-checking.results.model.label")}</h4>
            </Col>
            <Col>
              <h4>{translate("fact-checking.results.model.probability")}</h4>
            </Col>
          </Row> <Row className="text-center my-3">
            <Col>
              {featureStatement.predictLabel ? (
                <h5 className="text-success">Ακριβής</h5>
              ) : (
                <h5 className="text-danger">Ανακριβής</h5>
              )}
            </Col>
            <Col>
              <h5
                className={featureStatement.predictProba > 0.5 ? 'text-success' : 'text-danger'}>{Math.round(featureStatement.predictProba * 100)}%</h5>
            </Col></Row></> :
          <><Row className="text-center my-3 text-info">
            <Col>
              <h4>{translate("fact-checking.results.model.label")}</h4>
            </Col>
          </Row> <Row className="text-center my-3">
            <Col>
              <h5 className="text-danger">Ανεπαρκή δεδομένα για αυτόματη παραγωγή απόφασης</h5>
            </Col>
          </Row></>
        }

        <Row className="text-center my-3 text-info">
          <Col>
            <h4 className="result-collapse"
                onClick={() => setEmotionCollapse(!emotionCollapse)}>{translate("fact-checking.results.model.emotions")}</h4>
          </Col>
        </Row>
        <Collapse isOpen={emotionCollapse}>
          {/* <Row className="text-center my-3 text-primary border-bottom">
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
            <Col><p>{((featureStatement.sEmotionAnger[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((featureStatement.sEmotionDisgust[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</p>
            </Col>
            <Col><p>{((featureStatement.sEmotionFear[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((featureStatement.sEmotionHappiness[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</p>
            </Col>
            <Col><p>{((featureStatement.sEmotionSadness[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</p>
            </Col>
            <Col><p>{((featureStatement.sEmotionSurprise[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</p>
            </Col>
          </Row>
          <Row className="text-center">
            <Col><p>Τίτλοι</p></Col>
            <Col><p>{(featureStatement.rTitleEmotionAnger[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rTitleEmotionDisgust[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rTitleEmotionFear[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rTitleEmotionHappiness[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rTitleEmotionSadness[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rTitleEmotionSurprise[3] * 100).toFixed(2)}%</p></Col>
          </Row>
          <Row className="text-center">
            <Col><p>Κείμενα</p></Col>
            <Col><p>{(featureStatement.rBodyEmotionAnger[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rBodyEmotionDisgust[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rBodyEmotionFear[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rBodyEmotionHappiness[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rBodyEmotionSadness[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rBodyEmotionSurprise[3] * 100).toFixed(2)}%</p></Col>
          </Row>
          <Row className="text-center">
            <Col><p>Αντιπροσωπ/τερες Παράγραφοι</p></Col>
            <Col><p>{(featureStatement.rSimParEmotionAnger[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimParEmotionDisgust[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimParEmotionFear[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimParEmotionHappiness[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimParEmotionSadness[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimParEmotionSurprise[3] * 100).toFixed(2)}%</p></Col>
          </Row>
          <Row className="text-center border-bottom">
            <Col><p>Αντιπροσωπ/τερες Προτάσεις</p></Col>
            <Col><p>{(featureStatement.rSimSentEmotionAnger[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimSentEmotionDisgust[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimSentEmotionFear[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimSentEmotionHappiness[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimSentEmotionSadness[3] * 100).toFixed(2)}%</p></Col>
            <Col><p>{(featureStatement.rSimSentEmotionSurprise[3] * 100).toFixed(2)}%</p></Col>
          </Row>
        </Collapse>
        <Row className="text-center mt-5 mb-3 text-info">
          <Col>
            <h4 className="result-collapse"
                onClick={() => setRestCollapse(!restCollapse)}>{translate("fact-checking.results.model.rest")}</h4>
          </Col>
        </Row>
        <Collapse isOpen={restCollapse}>
          <Row className="text-center my-3 text-primary border-bottom">
            <Col><h5>Πεδίο</h5></Col>
            <Col><h5>Αντικειμενικότητα</h5></Col>
            <Col><h5>Συναισθηματική Ένταση</h5></Col>
            <Col><h5>Ομοιότητα με Δήλωση</h5></Col>
          </Row>
          <Row className="text-center">
            <Col><p>Δήλωση</p></Col>
            <Col><p>{((1 - featureStatement.sSubjectivity) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((1 - featureStatement.sSentiment) * 100).toFixed(2)}%</p></Col>
            <Col><p>-</p></Col>
          </Row>
          <Row className="text-center">
            <Col><p>Τίτλοι</p></Col>
            <Col><p>{((1 - featureStatement.rTitleSubjectivity) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((1 - featureStatement.rTitleSentiment) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((1 - featureStatement.rTitleSimilarity) * 100).toFixed(2)}%</p></Col>
          </Row>
          <Row className="text-center">
            <Col><p>Κείμενα</p></Col>
            <Col><p>{((1 - featureStatement.rBodySubjectivity) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((1 - featureStatement.rBodySentiment) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((1 - featureStatement.rBodySimilarity) * 100).toFixed(2)}%</p></Col>
          </Row>
          <Row className="text-center">
            <Col><p>Αντιπροσωπ/τερες Παράγραφοι</p></Col>
            <Col><p>{((1 - featureStatement.rSimParSubjectivity) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((1 - featureStatement.rSimParSentiment) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((1 - featureStatement.rSimParSimilarity) * 100).toFixed(2)}%</p></Col>
          </Row>
          <Row className="text-center border-bottom">
            <Col><p>Αντιπροσωπ/τερες Προτάσεις</p></Col>
            <Col><p>{((1 - featureStatement.rSimSentSubjectivity) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((1 - featureStatement.rSimSentSentiment) * 100).toFixed(2)}%</p></Col>
            <Col><p>{((1 - featureStatement.rSimSentSimilarity) * 100).toFixed(2)}%</p></Col>
          </Row>
          <Row className="my-3">
            <Col>
              <ul className="text-muted">
                <li>Οι τιμές που αφορούν το πεδίο «Δήλωση» αναφέρονται στο ποσοστό των όρων που ταυτοποιήθηκαν με το
                  εκάστοτε χαρακτηριστικό.
                </li>
                <li>Tα πεδία «Τίτλοι», «Κείμενα», «Αντιπροσωπ/τερες Παράγραφοι» και «Αντιπροσωπ/τερες Προτάσεις»
                  αναφέρονται στο σύνολο των αντίστοιχων πεδίων που προκύπτουν από τις πηγές που ανακτήθηκαν. Οι τιμές
                  των πεδίων αυτών αναφέρονται στο ποσοστό των προτάσεων που ταυτοποιήθηκαν με το εκάστοτε
                  χαρακτηριστικό.
                </li>
              </ul>
            </Col>
          </Row> */}
          <Table bordered className={emotionCollapse ? 'show' : 'hide'}>
      <thead>
        <tr className="text-center my-3 text-primary border-bottom">
          <th>Πεδίο</th>
          <th>Θυμός</th>
          <th>Απέχθεια</th>
          <th>Φόβος</th>
          <th>Χαρά</th>
          <th>Λύπη</th>
          <th>Έκπληξη</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center">
          <td>Δήλωση</td>
          <td>{((featureStatement.sEmotionAnger[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
          <td>{((featureStatement.sEmotionDisgust[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
          <td>{((featureStatement.sEmotionFear[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
          <td>{((featureStatement.sEmotionHappiness[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
          <td>{((featureStatement.sEmotionSadness[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
          <td>{((featureStatement.sEmotionSurprise[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
        </tr>
        <tr className="text-center">
          <td>Τίτλοι</td>
          <td>{(featureStatement.rTitleEmotionAnger[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionDisgust[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionFear[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionHappiness[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionSadness[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionSurprise[3] * 100).toFixed(2)}%</td>
        </tr>
        <tr className="text-center">
          <td>Τίτλοι</td>
          <td>{(featureStatement.rTitleEmotionAnger[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionDisgust[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionFear[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionHappiness[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionSadness[3] * 100).toFixed(2)}%</td>
          <td>{(featureStatement.rTitleEmotionSurprise[3] * 100).toFixed(2)}%</td>
        </tr>
        <tr className="text-center">
            <td>Κείμενα</td>
            <td>{(featureStatement.rBodyEmotionAnger[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rBodyEmotionDisgust[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rBodyEmotionFear[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rBodyEmotionHappiness[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rBodyEmotionSadness[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rBodyEmotionSurprise[3] * 100).toFixed(2)}%</td>
          </tr>
          <tr className="text-center">
            <td>Αντιπροσωπ/τερες Παράγραφοι</td>
            <td>{(featureStatement.rSimParEmotionAnger[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimParEmotionDisgust[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimParEmotionFear[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimParEmotionHappiness[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimParEmotionSadness[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimParEmotionSurprise[3] * 100).toFixed(2)}%</td>
          </tr>
          <tr className="text-center border-bottom">
            <td>Αντιπροσωπ/τερες Προτάσεις</td>
            <td>{(featureStatement.rSimSentEmotionAnger[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimSentEmotionDisgust[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimSentEmotionFear[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimSentEmotionHappiness[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimSentEmotionSadness[3] * 100).toFixed(2)}%</td>
            <td>{(featureStatement.rSimSentEmotionSurprise[3] * 100).toFixed(2)}%</td>
          </tr>
          <Row className="text-center mt-5 mb-3 text-info">
          <Col>
            <h4 className="result-collapse"
                onClick={() => setRestCollapse(!restCollapse)}>{translate("fact-checking.results.model.rest")}</h4>
          </Col>
        </Row>
      </tbody>
    </Table>
        </Collapse>
        <div className="border">
          <Row className="text-center py-3">
            <Col>
              <h4 className="text-info">Απόφαση Ελεγκτή</h4>
            </Col>
          </Row>
          <Row className="text-center pb-3 align-items-center">
            <Col>
              <h4 className="m-0">Ακρίβεια:</h4>
            </Col>
            <Col md="8">
              <div className="accuracy" onChange={changeFactCheckerAccuracy}>
                <label>
                  <input type="radio" value={0} checked={statement.factCheckerAccuracy === 0} name="accuracy"/>
                  {translate('fact-checking.results.model.accuracy.0')}
                </label>
                <label>
                  <input type="radio" value={1} checked={statement.factCheckerAccuracy === 1} name="accuracy"/>
                  {translate('fact-checking.results.model.accuracy.1')}
                </label>
                <label>
                  <input type="radio" value={2} checked={statement.factCheckerAccuracy === 2} name="accuracy"/>
                  {translate('fact-checking.results.model.accuracy.2')}
                </label>
                <label>
                  <input type="radio" value={3} checked={statement.factCheckerAccuracy === 3} name="accuracy"/>
                  {translate('fact-checking.results.model.accuracy.3')}
                </label>
                <label>
                  <input type="radio" value={4} checked={statement.factCheckerAccuracy === 4} name="accuracy"/>
                  {translate('fact-checking.results.model.accuracy.4')}
                </label>
              </div>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <p>Με βάση τα παραπάνω στοιχεία μπορείτε να αλλάξετε την κατάσταση της δήλωσης αυτής</p>
            </Col>
          </Row>
        </div>
        <Row className="my-3">
          <Col className="d-flex justify-content-center" md={{size: 4, offset: 4}}>
            <Button tag={Link} to={statement.article == null ? "/article/new" : `/article/${statement.article.id}/edit`}
                    color="primary">
              {statement.article == null ? translate("fact-checking.analyze.action.createArticle") : translate("fact-checking.analyze.action.updateArticle")}
            </Button>
          </Col>
        </Row>
        <Row className="text-center mt-5 mb-2 text-info">
          <Col>
            <h3>{translate("fact-checking.results.model.retrieved")}</h3>
          </Col>
        </Row>
    </>
    )
};

export default FactchekcingReportAnalyzerResults;