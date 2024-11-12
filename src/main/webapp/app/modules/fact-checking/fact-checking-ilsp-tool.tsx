import { IRootState } from 'app/shared/reducers';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Container, Row, Col, Tooltip, Input, Button, Spinner, FormGroup, Label, Table } from 'reactstrap';
import { getTranslation } from './fact-checking.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const dummyToolResponse = {
  doc_id: '1',
  details: 'Success',
  support: [],
  refute: [
    {
      sentence:
        'New research suggests that although wealthy global citizens try to prevent climate migration, they are willing to shoulder a greater share of the climate mitigation burden when extreme climate events hit poor countries.',
      doi: '10.1038/s41558-020-0796-y',
    },
  ],
  no_info: [
    {
      sentence:
        'This paper proposes that developed countries implement their promised $100 billion annual assistance to developing nations by issuing, by 2023, a $2.5 trillion Global Decarbonization Bond that will front-load the provision of appropriate technologies for this purpose.',
      doi: '10.1088/1748-9326/ab396f',
    },
    {
      sentence:
        'International commitment from developed countries to developing countries is essential to strengthen their resilience, economic readiness and adaptive capacity to climate-related events.',
      doi: '10.1016/j.scitotenv.2018.11.349',
    },
    {
      sentence:
        'Unless rapid advances to the goals of the Paris Climate Change Agreement occur over the next decade, hundreds of millions of people are likely to face increasing amounts of poverty and social disruption, and, in some cases, regional insecurity.',
      doi: '10.3389/fmars.2017.00158',
    },
    {
      sentence:
        'We believe these recommendations are critical for China and other countries and extremely important for the world because they will pave the way toward a balance between nature conservation and human development as the projected human population reaches 10 billion by 2050.',
      doi: '10.1111/cobi.13221',
    },
    {
      sentence:
        'With effective measures by all stake holders we can reduce air pollution and prevent the global warming by 2030, along with 194 countries as adopted by WHO in May 2015.',
      doi: '10.1007/s12098-017-2538-3',
    },
  ],
};

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

  const handleIlspTooltip = () => setIlspTooltip(!ilspTooltip);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatementText(e.target.value);
  };

  const handleTranslation = () => {
    getTranslation(statementText);
  };

  const createStatementSource = info => {
    return { url: `https://doi.org/${info.doi}`, title: '-', snippet: info.sentence };
  };

  const handleAllSourceStatements = () => {
    // prepare all statements
    const preparedSources = dummyToolResponse.no_info.reduce((acc, info) => [...acc, createStatementSource(info)], []);
    // find out which of the statements are not already in the list
    const differences = preparedSources.filter(source => statementSources.find(s => s.url === source.url) === undefined);
    // find out if all of the fetched statements are included in the list
    const allIncluded = preparedSources.every(source => statementSources.find(s => s.url === source.url) !== undefined);
    if (allIncluded) {
      setStatementSources(prevState => prevState.filter(source => preparedSources.find(s => s.url === source.url) === undefined));
    } else {
      setStatementSources(prevState => [...prevState, ...differences]);
    }
  };

  const handleCheckboxValue = info => {
    return statementSources.find(s => s.url === createStatementSource(info).url) !== undefined;
  };

  const handleAllCheckboxValue = () => {
    const preparedSources = dummyToolResponse.no_info.reduce((acc, info) => [...acc, createStatementSource(info)], []);
    return preparedSources.every(source => statementSources.find(s => s.url === source.url) !== undefined);
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
          Αναζήτηση Σχετικών Δημοσιεύσεων
        </ModalHeader>
        <ModalBody>
          <Container style={{ display: 'flex', flexDirection: 'column', rowGap: 20 }}>
            <Row>
              <Col style={{display: "flex", alignItems: "center", justifyContent: "center", columnGap: 20}}>
                {/* <InputGroup>
                  <Input placeholder="Check it out" value={statementText} onChange={handleTextChange} />
                  <InputGroupText>
                    <Button
                      style={{ padding: 0, border: 'none', backgroundColor: 'transparent', color: 'black', width: '100%' }}
                      onClick={handleTranslation}
                      disabled={ilspTool.translator.loading}
                    >
                      {ilspTool.translator.loading ? <Spinner size="sm" /> : <FontAwesomeIcon icon="chart-pie" style={{ fontSize: 15 }} />}
                    </Button>
                  </InputGroupText>
                </InputGroup> */}
                <h1>Αποτελέσματα Αναζήτησης</h1>
                <FontAwesomeIcon icon={faInfoCircle} id="info-button" />
                <Tooltip isOpen={ilspTooltip} target="info-button" toggle={handleIlspTooltip}>
                        {`Αποτελέσματα αναζήτησης για την δήλωση: ${ilspTool.translator.data?.translatedText || statementText}`}
                </Tooltip>
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Translated Text</Label>
                  <Input disabled value={ilspTool.translator.data ? ilspTool.translator.data.translatedText : ''} />
                </FormGroup>
              </Col>
            </Row> */}
            {ilspTool.translator.data &&
              dummyToolResponse.no_info.map((info, idx) => (
                <Row key={`result-${idx}`}>
                  <Col>
                    <h5>{info.sentence}</h5>
                    <a href={` https://doi.org/${info.doi}`} target="_blank" rel="noopener noreferrer">
                      {info.doi}
                    </a>
                  </Col>
                </Row>
              ))}
            <Row>
              <Col>
                <Table responsive>
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
                    {dummyToolResponse.no_info.map((info, idx) => (
                      <tr key={`entity-tool-${idx}`}>
                        <td>
                          <Input type="checkbox" checked={handleCheckboxValue(info)} onClick={handleSourceStatement(info)} />
                        </td>
                        <td>
                          <a href={` https://doi.org/${info.doi}`} target="_blank" rel="noopener noreferrer">
                            {info.doi}
                          </a>
                        </td>
                        <td> - </td>
                        <td>{info.sentence}</td>
                      </tr>
                    ))}
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
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactCheckingIlspTool);
