/**
 * 实现 TANGCONF 获取配置的接口
 */
import { EventEmitter } from 'events';
import LRUCache from 'lru-cache';
import type { ConfigItem } from './config-item';
import type { TangconfOptions } from '@/types';
import { LRU_MAX } from '@/common/constant';

export class Tangconf extends EventEmitter {
    private readonly lru: LRUCache<string, ConfigItem>;

    constructor(options?: TangconfOptions) {
        super();

        this.lru = new LRUCache({ max: options?.maxCache ?? LRU_MAX });
    }

    clearCache() {
        this.lru.reset();
    }
}
