import { Status } from "libs/common/src";

export interface ActivityLog {
    traceId: string;

    tenantId: string;

    app: string;

    module: string;

    action: string;

    endpoint: string;

    method: string;

    userId?: string;

    role?: string;

    ipAddress?: string;

    status: Status;

    timestamp: string;
}