import React, { useEffect, useState } from 'react';
import { Col, Row, Progress } from 'reactstrap';
import { Translate, Storage } from 'react-jhipster';

interface TaskProgressProps {
  inProduction: boolean;
  taskId: string;
  progressMessage: string;
  onSuccess: () => void;
}

interface ProgressData {
  taskId: string;
  progress: number;
  status: 'PROGRESS' | 'SUCCESS' | 'FAILURE';
  type: string;
}

const TaskProgress: React.FC<TaskProgressProps> = props => {
  const { inProduction, taskId, progressMessage } = props;
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [status, setStatus] = useState<'idle' | 'connected' | 'done' | 'error'>('idle');

  const authToken = Storage.local.get('jhi-authenticationToken')
    ? Storage.local.get('jhi-authenticationToken')
    : Storage.session.get('jhi-authenticationToken');

  useEffect(() => {
    if (taskId) {
      const ws = new WebSocket(`${inProduction ? 'wss://check4facts.gr/ml/' : 'ws://localhost:9090/'}ws/${taskId}?token=${authToken}`);

      ws.onopen = () => {
        setStatus('connected');
      };

      ws.onmessage = event => {
        try {
          let data = JSON.parse(event.data);

          // If the result is still a string, parse again (handle double-encoded JSON)
          if (typeof data === 'string') {
            data = JSON.parse(data);
          }

          // Fix progress type if needed
          data.progress = Number(data.progress);

          setProgressData({ ...data });

          if (data.status === 'SUCCESS') {
            setStatus('done');
            props.onSuccess();
            ws.close(1000, 'Task completed successfully');
          }

          if (data.status === 'FAILURE') {
            setStatus('error');
            ws.close(4001, 'Task failed');
          }
        } catch (err) {
          console.error('Error parsing message:', err);
        }
      };

      ws.onerror = err => {
        console.error('WebSocket error:', err);
        setStatus('error');
      };
    }
  }, [taskId]);

  return (
    <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {status === 'error' ? (
        <p className="text-red-500">❌ Error occurred on task with id: {taskId}.</p>
      ) : (
        <Col md={{ size: 6, offset: 0 }}>
          <p style={{ textAlign: 'center' }}>
            <Translate contentKey={progressMessage} />
          </p>
          <Progress animated color="info" value={progressData ? progressData.progress : 0} />
        </Col>
      )}
    </Row>
  );
};

export default TaskProgress;
