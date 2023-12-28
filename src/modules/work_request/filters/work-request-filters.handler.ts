import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { WorkRequest } from '../entities/work-request.entity';
import { WorkRequestDraftModeFilter } from './methods/work-request-draft-mode.filter';
import { WorkRequestPublishedModeFilter } from './methods/work-request-published-mode.filter';

export class WorkRequestsFiltersHandler extends BaseFilterHandler<WorkRequest> {
  protected filters = {
    draftMode: new WorkRequestDraftModeFilter(),
    published: new WorkRequestPublishedModeFilter(),
  };
}
