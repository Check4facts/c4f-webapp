import React from 'react';
import { Row, Col, Progress } from 'reactstrap';
import { ITaskStatus } from '../model/util.model';

interface IProgressBar {
  message: string;
  task: ITaskStatus;
}

export const ProgressBar = (props: IProgressBar) => {
  const { message, task } = props;

  return task.taskInfo ? (
    <Row>
      <Col>
        <div className="text-center">{message}</div>
        <Progress animated color="info" value={task.taskInfo.current * (100 / task.taskInfo.total)} />
        <div className="text-center">
          Βήμα <span className="text-warning">{task.taskInfo.current}</span> από <span className="text-success">{task.taskInfo.total}</span>
        </div>
      </Col>
    </Row>
  ) : (
    <></>
  );
};
