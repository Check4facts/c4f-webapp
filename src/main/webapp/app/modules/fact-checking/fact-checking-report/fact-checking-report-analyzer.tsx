import React from 'react';
import { Modal, ModalHeader, ModalBody, Table, Col, Row } from 'reactstrap';
import './fact-checking-report-analyzer.scss';
import { Translate, translate } from 'react-jhipster';
import moment from 'moment';
import FactchekcingReportAnalyzerResults from './fact-checking-report-analyzer-results';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

interface IFactCheckingReportAnalyzer extends StateProps, DispatchProps {
  open: boolean;
  toggle: any;
}

const paragraphStyle = {
  border: '1px solid rgba(0,0,0,0.2)',
  borderRadius: 4,
  backgroundColor: '#f2f2f2',
  padding: 8,
} as React.CSSProperties;

const FactCheckingReportAnalyzer = (props: IFactCheckingReportAnalyzer) => {
  const { open, toggle, statement, currentLocale, statementSources } = props;

  const shortenStatementText = text => (text.length > 20 ? `${text.substring(0, 20)}...` : text);

  return (
    <Modal
      isOpen={open}
      fade={false}
      toggle={toggle}
      backdrop={true}
      className="report-modal-dialog"
      contentClassName="report-modal-content"
    >
      <ModalHeader toggle={toggle} className="report-modal-title">
        Αναλυτής Δήλωσης
      </ModalHeader>
      <ModalBody className="report-modal-body">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
          <Row style={{ display: 'flex', flexDirection: 'column', width: '80%', rowGap: 1 }} size={{ size: 3, offset: 3 }}>
            <Row>
              <Col style={{ textAlign: 'center' }}>
                <h1>{translate('fact-checking.analyze.titleAlt')}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>{translate('check4FactsApp.statement.text')}</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>{statement.text}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>{translate('check4FactsApp.statement.author')}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>{statement.author}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>{translate('check4FactsApp.statement.statementDate')}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>{moment.locale(currentLocale) && moment(statement.statementDate).format('LL')}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>{translate('check4FactsApp.statement.topic')}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>{(statement.topic && translate(`fact-checking.sub-menus.${statement.topic.name}`)) || 'n/a'}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>{translate('check4FactsApp.statement.subTopics')}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>{statement.subTopics ? statement.subTopics.join(', ') : '-'}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>{translate('check4FactsApp.statement.mainArticleText')}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>{statement.mainArticleText}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>{translate('check4FactsApp.statement.mainArticleUrl')}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>
                  {statement.mainArticleUrl ? (
                    <a href={statement.mainArticleUrl} target="_blank" rel="noopener noreferrer">
                      {statement.mainArticleUrl}
                    </a>
                  ) : (
                    '-'
                  )}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>{translate('check4FactsApp.statement.statementSources')}</h4>
                {/* <p className="text-muted">εισηγμένες από τον ειδικό ελεγκτή δήλωσης</p> */}
              </Col>
            </Row>
            <Row>
              {statementSources.length > 0 ? (
                <Col>
                  <Table responsive hover bordered>
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
                      </tr>
                    </thead>
                    <tbody>
                      {statementSources.map((statementSource, i) => (
                        <tr key={`entity-${i}`}>
                          <td>{i + 1}</td>
                          <td>
                            <a href={statementSource.url} target="_blank" rel="noopener noreferrer">
                              {shortenStatementText(statementSource.url)}
                            </a>
                          </td>
                          <td>
                            <p title={statementSource.title}>{shortenStatementText(statementSource.title)}</p>
                          </td>
                          <td>
                            <p title={statementSource.snippet}>{shortenStatementText(statementSource.snippet)}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              ) : (
                <Col>
                  <p className="alert alert-warning">{translate('fact-checking.check.statementSources.notAdded')}</p>
                </Col>
              )}
            </Row>
          </Row>
        </div>
        <FactchekcingReportAnalyzerResults />
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
  loading: storeState.article.loading,
  statement: storeState.statement.entity,
  statementSources: storeState.statementSource.entities,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactCheckingReportAnalyzer);
