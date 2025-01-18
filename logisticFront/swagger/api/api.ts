export * from './account.service';
import { AccountService } from './account.service';
export * from './gidLogistics.service';
import { GidLogisticsService } from './gidLogistics.service';
export * from './tracking.service';
import { TrackingService } from './tracking.service';
export const APIS = [AccountService, GidLogisticsService, TrackingService];
