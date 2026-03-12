import { SetMetadata } from '@nestjs/common';

export const TRACK_ACTIVITY = 'track_activity';

export const TrackActivity = (module: string, action: string) =>
    SetMetadata(TRACK_ACTIVITY, { module, action });