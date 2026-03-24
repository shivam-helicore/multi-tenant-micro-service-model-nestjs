import { AsyncLocalStorage } from 'async_hooks';

interface ContextStore {
    traceId?: string;
    tenantId?: string;
    userId?: string;
}

export class RequestContext {

    private static storage = new AsyncLocalStorage<ContextStore>();

    static run(context: ContextStore, callback: () => void) {
        this.storage.run(context, callback);
    }

    static get(key: keyof ContextStore) {
        const store = this.storage.getStore();
        return store?.[key];
    }

    static getTraceId() {
        return this.get('traceId');
    }

    static getTenantId() {
        return this.get('tenantId');
    }

    static getUserId() {
        return this.get('userId');
    }

}