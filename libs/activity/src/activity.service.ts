import { Injectable } from '@nestjs/common';
import { ActivityLog } from './interfaces/activity.interface';

@Injectable()
export class ActivityService {

    async track(activity: ActivityLog) {

        // For now log it
        console.log('ACTIVITY', activity);

        // Later we will save to:
        // DynamoDB
        // Kafka
        // Elastic
    }
}