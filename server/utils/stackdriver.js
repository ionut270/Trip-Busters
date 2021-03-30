const monitoring = require('@google-cloud/monitoring');

async function quickstart() {
    const projectId ='delta-309009';
  
    const client = new monitoring.MetricServiceClient();
  
    const dataPoint = {
      interval: {
        endTime: {
          seconds: Date.now() / 1000,
        },
      },
      value: {
        doubleValue: 123.45,
      },
    };
  
    const request = {
        name: client.projectPath(projectId),
        timeSeries: [
          {
            metric: {
              type: 'custom.googleapis.com/stores/daily_sales',
              labels: {
                store_id: 'Pittsburgh',
              },
            },
            resource: {
              type: 'global',
              labels: {
                project_id: projectId,
              },
            },
            points: [dataPoint],
          },
        ],
    };

    const [result] = await client.createTimeSeries(request);
    console.log('Done writing time series data.', result);
  }

  module.exports = { quickstart };