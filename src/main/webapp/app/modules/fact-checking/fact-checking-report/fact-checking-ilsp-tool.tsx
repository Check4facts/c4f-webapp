import { IRootState } from 'app/shared/reducers';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Row,
  Col,
  Tooltip,
  Input,
  Button,
  Spinner,
  InputGroup,
  InputGroupText,
  Table,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { getClaimVerification, getTranslation, resetIlspTool } from '../fact-checking.reducer';
import { get, set } from 'lodash';

interface IFactCheckingIlspTool extends StateProps, DispatchProps {
  ilspToolOpen: boolean;
  handleIlspTool: () => void;
  statementText: string;
  setStatementText: Dispatch<SetStateAction<string>>;
  statementSources: any[];
  setStatementSources: Dispatch<SetStateAction<any[]>>;
}

const FactCheckingIlspTool = (props: IFactCheckingIlspTool) => {
  const { ilspToolOpen, handleIlspTool, ilspTool, statementText, setStatementText, statementSources, setStatementSources } = props;
  const [ilspTooltip, setIlspTooltip] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('Αναζήτηση');
  const interval = React.useRef(null);

  useEffect(() => {
    props.getTranslation(statementText);

    interval.current = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Αναζήτηση...') {
          return 'Αναζήτηση';
        }
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(interval.current)
      props.resetIlspTool();
    };
  }, []);

  useEffect(() => {
    if (ilspTool.translator.data) {
      props.getClaimVerification(ilspTool.translator.data.translatedText);
      setLoadingText('Αναζήτηση');
    }else if(ilspTool.translator.error){
      clearInterval(interval.current);
      setLoadingText("An error occured during Translation");
    }
  }, [ilspTool.translator]);

  useEffect(() => {
    if (ilspTool.recommender.data || !ilspTool.recommender.loading) {
      setLoadingText('Αναζήτηση');
    }else if(ilspTool.recommender.error){
      clearInterval(interval.current);
      setLoadingText("An error occured during scinobo request");
    }
  }, [ilspTool.recommender]);

  const handleSearch = () => {
    props.getTranslation(statementText);
  };

  const handleIlspTooltip = () => setIlspTooltip(!ilspTooltip);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatementText(e.target.value);
  };

  const createStatementSource = info => {
    return { url: `https://doi.org/${info.doi}`, title: info.title, snippet: info.sentence };
  };

  const handleAllSourceStatements = () => {
    // prepare all statements
    if (ilspTool.recommender.data && !ilspTool.recommender.loading) {
    const preparedSources = ilspTool.recommender.data.no_info.reduce((acc, info) => [...acc, createStatementSource(info)], []);
    // find out which of the statements are not already in the list
    const differences = preparedSources.filter(source => statementSources.find(s => s.url === source.url) === undefined);
    // find out if all of the fetched statements are included in the list
    const allIncluded = preparedSources.every(source => statementSources.find(s => s.url === source.url) !== undefined);
    if (allIncluded) {
      setStatementSources(prevState => prevState.filter(source => preparedSources.find(s => s.url === source.url) === undefined));
    } else {
      setStatementSources(prevState => [...prevState, ...differences]);
    }
  }
  };

  const handleCheckboxValue = info => {
    return statementSources.find(s => s.url === createStatementSource(info).url) !== undefined;
  };

  const handleAllCheckboxValue = () => {
    if (ilspTool.recommender.data && !ilspTool.recommender.loading) {
    const preparedSources = ilspTool.recommender.data.no_info.reduce((acc, info) => [...acc, createStatementSource(info)], []);
    return preparedSources.every(source => statementSources.find(s => s.url === source.url) !== undefined);
    }
  };

  const handleSourceStatement = info => e => {
    const statement = createStatementSource(info);
    if (statementSources.some(source => source.url === statement.url)) {
      setStatementSources(prevState => prevState.filter(source => source.url !== statement.url));
    } else {
      setStatementSources(prevState => [...prevState, statement]);
    }
  };

  return (
    <>
      <Modal
        isOpen={ilspToolOpen}
        fade={false}
        toggle={handleIlspTool}
        backdrop={true}
        className="iel-tool-modal"
        contentClassName="iel-tool-modal-content"
        size="lg"
      >
        <ModalHeader toggle={handleIlspTool} className="iel-tool-modal-title">
          Βιβλιογραφικες Προτάσεις
        </ModalHeader>
        <ModalBody>
          <Container style={{ display: 'flex', flexDirection: 'column', rowGap: 40 }}>
            <Row>
              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', rowGap: 10 }}>
              <h3>Αναζητήστε σχετικά επιστημονικά άρθρα για την παρακάτω δήλωση.</h3>
                <InputGroup style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                  <Input
                    placeholder="Check it out"
                    value={statementText}
                    onChange={handleTextChange}
                    disabled={ilspTool.translator.loading || ilspTool.recommender.loading}
                  />
                  <InputGroupText>
                    <Button
                      style={{ padding: 0, border: 'none', backgroundColor: 'transparent', color: 'black', width: '100%' }}
                      onClick={handleSearch}
                      disabled={ilspTool.translator.loading}
                    >
                      {ilspTool.translator.loading || ilspTool.recommender.loading ? <Spinner size="sm" /> : <FontAwesomeIcon icon="search" style={{ fontSize: 15 }} />}
                    </Button>
                  </InputGroupText>
                </InputGroup>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', columnGap: 2, width: '100%', paddingRight: "2rem" }}>
                          <p style={{ fontSize: '1rem' }}>powered by</p>
                          <img
                            style={{ height: '1.5rem', marginBottom: '0.5rem' }}
                            src="/content/images/inobo-logo-full.svg"
                            alt="inobo-full-logo"
                          />
                        </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table responsive style={{ maxHeight: '200px', overflow: 'auto' }}>
                  <thead>
                    <tr>
                      <th style={{ verticalAlign: 'unset' }}>
                        <Input type="checkbox" checked={handleAllCheckboxValue()} onClick={handleAllSourceStatements} />
                      </th>
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
                    {!ilspTool.recommender.data || ilspTool.recommender.loading ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', verticalAlign: 'center' }}>
                          <p style={{ fontSize: '2rem', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {loadingText}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      ilspTool.recommender.data.no_info.map((info, idx) => (
                        <tr key={`entity-tool-${idx}`}>
                          <td>
                            <Input type="checkbox" checked={handleCheckboxValue(info)} onClick={handleSourceStatement(info)} />
                          </td>
                          <td>
                            <a href={` https://doi.org/${info.doi}`} target="_blank" rel="noopener noreferrer">
                              {info.doi}
                            </a>
                          </td>
                          <td>{info.title}</td>
                          <td>{info.sentence}</td>
                        </tr>
                      ))
                    )}
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'right' }}>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  ilspTool: storeState.factChecking.ilspTool,
});

const mapDispatchToProps = {
  getTranslation,
  getClaimVerification,
  resetIlspTool,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactCheckingIlspTool);
