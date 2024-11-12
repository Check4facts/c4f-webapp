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
  InputGroup,
  InputGroupText,
  Input,
  Button,
  Spinner,
  FormGroup,
  Label,
} from 'reactstrap';
import { getTranslation } from './fact-checking.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
}

const FactCheckingIlspTool = (props: IFactCheckingIlspTool) => {
  const { ilspToolOpen, handleIlspTool, ilspTool, getTranslation, statementText, setStatementText } = props;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatementText(e.target.value);
  };

  const handleTranslation = () => {
    getTranslation(statementText);
  };

  return (
    <>
      {console.log(ilspTool)}
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
          Επαλήθευση Ισχυρισμού
        </ModalHeader>
        <ModalBody>
          <Container style={{ display: 'flex', flexDirection: 'column', rowGap: 20 }}>
            <Row>
              <Col>
                <InputGroup>
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
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Translated Text</Label>
                  <Input disabled value={ilspTool.translator.data ? ilspTool.translator.data.translatedText : ''} />
                </FormGroup>
              </Col>
            </Row>
            {ilspTool.translator.data && dummyToolResponse.no_info.map(info => 
            <Row>
              <Col>
                <h5>{info.sentence}</h5>
                <a href={` https://doi.org/${info.doi}`} target="_blank" rel="noopener noreferrer">
                      {info.doi}
                    </a>
              </Col>
            </Row>)}
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
