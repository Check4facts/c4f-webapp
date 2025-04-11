import React, { useEffect, useState } from 'react';
import { Col, Row, Progress } from 'reactstrap';
import { Translate, Storage } from 'react-jhipster';

interface TaskProgressProps {
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
  const { taskId, progressMessage } = props;
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [status, setStatus] = useState<'idle' | 'connected' | 'done' | 'error'>('idle');

  const authToken = Storage.local.get('jhi-authenticationToken')
    ? Storage.local.get('jhi-authenticationToken')
    : Storage.session.get('jhi-authenticationToken');

  useEffect(() => {
    if (taskId) {
      const ws = new WebSocket(`ws://localhost:9090/ws/${taskId}?token=${authToken}`);

      ws.onopen = () => {
        setStatus('connected');
      };

      ws.onmessage = event => {
        try {
          const data: ProgressData = JSON.parse(event.data);
          setProgressData(data);

          if (data.status === 'SUCCESS') {
            setStatus('done');
            props.onSuccess();
            ws.close();
          }

          if (data.status === 'FAILURE') {
            setStatus('error');
            ws.close();
          }
        } catch (err) {
          console.error('Error parsing message:', err);
        }
      };

      ws.onerror = err => {
        console.error('WebSocket error:', err);
        setStatus('error');
      };

      ws.onclose = () => {
        if (status !== 'done') setStatus('idle');
      };

      return () => {
        ws.close();
      };
    }
  }, [taskId]);

  return (
    <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {status === 'error' ? (
        <p className="text-red-500">❌ Error occurred while tracking progress.</p>
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
